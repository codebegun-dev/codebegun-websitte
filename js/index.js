function getNextMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7; // Calculate days to next Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday); // Set date to next Monday

    // Format the date (e.g., "Monday, November 13, 2023")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return nextMonday.toLocaleDateString('en-US', options);
}

// Display the next Monday's date
document.addEventListener("DOMContentLoaded", function () {
    //const batchDateElement = document.getElementById('batchDate');
    //batchDateElement.textContent = "On " + getNextMonday();
});
    

