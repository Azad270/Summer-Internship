// Controller tests with in-memory stand-ins for the Mongoose models (no DB / no mongoose needed).
const test = require("node:test");
const assert = require("node:assert/strict");

const calls = { userUpdates: [], created: [], habitUpdates: [] };
let habitStore = [];

const habitId = "64b7f0c2a1b2c3d4e5f60001";
const OWNER = "64b7f0c2a1b2c3d4e5f6aaaa";
const ATTACKER = "64b7f0c2a1b2c3d4e5f6bbbb";

const makeHabit = (over = {}) => {
    const h = { _id: habitId, user: OWNER, title: "Read", xp: 20, difficulty: "Medium", completedDates: [], ...over };
    h.toObject = () => ({ ...h, completedDates: [...h.completedDates] });
    return h;
};

const stubs = {
    "../models/Habit": {
        countDocuments: async () => 0,
        create: async (doc) => { calls.created.push(doc); return doc; },
        findOne: async (f) => habitStore.find((h) => h._id === f._id && h.user === f.user) || null,
        findOneAndUpdate: async (f, upd) => {
            calls.habitUpdates.push({ f, upd });
            const h = habitStore.find((x) => x._id === f._id && x.user === f.user);
            if (!h) return null;
            if (upd.$push) {
                if (h.completedDates.includes(upd.$push.completedDates)) return null; // conditional filter fails
                h.completedDates.push(upd.$push.completedDates);
            }
            if (upd.$pull) {
                if (!h.completedDates.includes(upd.$pull.completedDates)) return null;
                h.completedDates = h.completedDates.filter((d) => d !== upd.$pull.completedDates);
            }
            return h;
        },
    },
    "../models/User": {
        findByIdAndUpdate: async (id, upd) => {
            calls.userUpdates.push({ id, upd });
            const xp = (upd.$inc && upd.$inc.xp) || 0;
            return { _id: id, xp: Math.max(0, xp), level: 1, rank: "E" };
        },
    },
};
for (const [rel, exports] of Object.entries(stubs)) {
    const resolved = require.resolve(rel, { paths: [__dirname + "/../controllers"] });
    require.cache[resolved] = { id: resolved, filename: resolved, loaded: true, exports };
}
const ctrl = require("../controllers/habitController");

const run = async (handler, { body = {}, params = {}, query = {}, userId = OWNER } = {}) => {
    const res = { statusCode: 200, body: null, status(c) { this.statusCode = c; return this; }, json(b) { this.body = b; return this; } };
    await handler({ body, params, query, user: { id: userId } }, res);
    return res;
};
const reset = () => { habitStore = [makeHabit()]; calls.userUpdates = []; calls.created = []; calls.habitUpdates = []; };

const today = new Date().toISOString().slice(0, 10);

test("toggleHabit: another user's habit is a 404 and awards nothing (was an IDOR)", async () => {
    reset();
    const res = await run(ctrl.toggleHabit, { params: { id: habitId }, body: { date: today }, userId: ATTACKER });
    assert.equal(res.statusCode, 404);
    assert.equal(calls.userUpdates.length, 0);
    assert.deepEqual(habitStore[0].completedDates, []);
});

test("toggleHabit: fake dates are rejected before touching the DB (was free XP farming)", async () => {
    reset();
    for (const date of ["a", "b", "2099-01-01", undefined, null, { $ne: 1 }]) {
        const res = await run(ctrl.toggleHabit, { params: { id: habitId }, body: { date } });
        assert.equal(res.statusCode, 400, String(date));
    }
    assert.equal(calls.userUpdates.length, 0);
});

test("toggleHabit: completes once, awards the habit's XP, and a repeat request awards nothing", async () => {
    reset();
    const first = await run(ctrl.toggleHabit, { params: { id: habitId }, body: { date: today } });
    assert.equal(first.statusCode, 200);
    assert.deepEqual(calls.userUpdates[0].upd, { $inc: { xp: 20 } });

    // simulate the double-click: both requests read "not completed", so the second finds the
    // conditional update's filter no longer matches and must NOT award again
    habitStore[0].completedDates = [today];
    const origFindOne = stubs["../models/Habit"].findOne;
    stubs["../models/Habit"].findOne = async (f) => { const h = await origFindOne(f); if (!h) return h; const stale = makeHabit({ completedDates: [] }); return stale; };
    calls.userUpdates = [];
    const second = await run(ctrl.toggleHabit, { params: { id: habitId }, body: { date: today } });
    stubs["../models/Habit"].findOne = origFindOne;
    assert.equal(second.statusCode, 200);
    assert.deepEqual(calls.userUpdates[0].upd, { $inc: { xp: 0 } });
});

test("toggleHabit: un-completing subtracts exactly the habit's XP", async () => {
    reset();
    habitStore[0].completedDates = [today];
    await run(ctrl.toggleHabit, { params: { id: habitId }, body: { date: today } });
    assert.deepEqual(calls.userUpdates[0].upd, { $inc: { xp: -20 } });
});

test("createHabit: client-sent xp is ignored; description IS saved", async () => {
    reset();
    const res = await run(ctrl.createHabit, { body: { title: "Run", description: "5k", xp: 999999, difficulty: "Hard" } });
    assert.equal(res.statusCode, 201);
    assert.equal(calls.created[0].xp, 40);              // server table, not 999999
    assert.equal(calls.created[0].description, "5k");   // previously dropped
    assert.equal(calls.created[0].user, OWNER);
});

test("createHabit: rejects bad difficulty and non-string titles", async () => {
    reset();
    assert.equal((await run(ctrl.createHabit, { body: { title: "x", difficulty: "Godlike" } })).statusCode, 400);
    assert.equal((await run(ctrl.createHabit, { body: { title: { $ne: null } } })).statusCode, 400);
    assert.equal(calls.created.length, 0);
});

test("updateHabit: difficulty is locked once completions exist", async () => {
    reset();
    habitStore[0].save = async () => {};
    habitStore[0].completedDates = [today];
    const res = await run(ctrl.updateHabit, { params: { id: habitId }, body: { difficulty: "Elite", xp: 5000 } });
    assert.equal(res.statusCode, 400);
    assert.equal(habitStore[0].xp, 20);
});
