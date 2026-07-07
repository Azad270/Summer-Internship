let marks = [85, 90, 78, 88, 92, 76, 81, 95, 89, 84];

let total = 0;

// Calculate total
for (let i = 0; i < marks.length; i++) {
    total += marks[i];
}

// Calculate average
let average = total / marks.length;

console.log("Total Marks:", total);
console.log("Average Marks:", average);