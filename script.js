// Set the start date (you can change this to any desired date)
const startDate = new Date('2024-01-01T00:00:00Z');

// Format and display the start date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    return date.toLocaleDateString('en-US', options) + ' UTC';
}

document.getElementById('startDateDisplay').textContent = formatDate(startDate);

// Animation function
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update counters
function updateCounters() {
    const now = new Date();
    const secondsElapsed = (now - startDate) / 1000;

    // Update disposed vapes counter
    const disposedVapes = Math.floor(secondsElapsed * 8.27);
    animateValue(document.getElementById('disposedCounter'), disposedVapes - 8, disposedVapes, 1000);

    // Update sold vapes counter
    const soldVapes = Math.floor(secondsElapsed * 11.57);
    animateValue(document.getElementById('soldCounter'), soldVapes - 12, soldVapes, 1000);

    // Update lithium wasted counter
    const lithiumWasted = Math.floor(secondsElapsed / (1.75 * 3600));
    animateValue(document.getElementById('lithiumCounter'), lithiumWasted, lithiumWasted + 1, 6300000);

    // Update potential recycling cost counter
    const recyclingCost = Math.floor(secondsElapsed * 6.33);
    animateValue(document.getElementById('costCounter'), recyclingCost - 6, recyclingCost, 1000);

    // Update fires counter
    const daysPassed = Math.floor(secondsElapsed / 86400);
    document.getElementById('fireCounter').textContent = daysPassed.toLocaleString();
}

// Update counters every second
setInterval(updateCounters, 1000);

// Initial update
updateCounters();