const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Habit = require('../models/Habit');

// Configure your email transporter (Use a Gmail account with an App Password for the evaluation)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // e.g., your test gmail
        pass: process.env.EMAIL_PASS  // e.g., your 16-character gmail app password
    }
});

const startCronJobs = () => {
    // Runs every day at 08:00 AM server time
    cron.schedule('0 8 * * *', async () => {
        console.log("CRON: Initiating daily protocol checks...");
        try {
            const users = await User.find();
            
            for (const user of users) {
                // Fetch habits for this user that are NOT completed today
                // (You will need to adjust this query based on how you track completions)
                const pendingHabits = await Habit.find({ 
                    user: user._id, 
                    // Add your specific logic here that checks if it was completed today
                });

                if (pendingHabits.length > 0) {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: user.email,
                        subject: 'SYSTEM ALERT: Daily Quests Pending',
                        text: `Awaken, Player. You have ${pendingHabits.length} uncompleted quests today. Do not break the chain. Log in to Ascent to complete your daily protocols.`
                    };

                    await transporter.sendMail(mailOptions);
                    console.log(`Reminder dispatched to ${user.email}`);
                }
            }
        } catch (error) {
            console.error("CRON Error:", error);
        }
    });
};

module.exports = startCronJobs;