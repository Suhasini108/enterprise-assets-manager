// =======================================
// Recent Activity
// =======================================

// Local Storage Key
const ACTIVITY_KEY = "recentActivities";

// Get activity list
const activityList = document.getElementById("activityList");

// Load activities
function loadActivities()
{
    const data = localStorage.getItem(ACTIVITY_KEY);

    if(data)
    {
        return JSON.parse(data);
    }

    return [];
}

// Save activities
function saveActivities(activities)
{
    localStorage.setItem(
        ACTIVITY_KEY,
        JSON.stringify(activities)
    );
}

// Display Activities
function displayActivities()
{
    activityList.innerHTML = "";

    const activities = loadActivities();

    if(activities.length === 0)
    {
        const li = document.createElement("li");
        li.textContent = "No recent activity yet.";
        li.style.color = "gray";
        activityList.appendChild(li);
        return;
    }

    activities.forEach(function(activity)
    {
        const li = document.createElement("li");

        li.textContent = activity;

        activityList.appendChild(li);
    });
}


// =======================================
// Add New Activity
// =======================================

function addActivity(message)
{
    // Load old activities
    const activities = loadActivities();

    // Current date & time
    const now = new Date();

    const time = now.toLocaleString();

    // Add newest activity at the top
    activities.unshift(`${time} - ${message}`);

    // Keep only latest 10 activities
    if(activities.length > 10)
    {
        activities.pop();
    }

    // Save activities
    saveActivities(activities);

    // Refresh activity list
    displayActivities();
}

displayActivities();
