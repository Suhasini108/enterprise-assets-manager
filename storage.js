// This is the name under which all assets
// will be stored inside the browser.

const STORAGE_KEY = "enterpriseAssets";

// Separate key for subscriptions so they never collide with assets
const SUB_STORAGE_KEY = "enterpriseSubscriptions";

// ==========================================
// Save Assets into Local Storage
// ==========================================

function saveAssets(assets)
{
    // Convert JavaScript array into a string
    const data = JSON.stringify(assets);

    // Save string into Local Storage
    localStorage.setItem(STORAGE_KEY, data);
}


// Load Assets from Local Storage
function loadAssets()
{
    // Read data from Local Storage
    const data = localStorage.getItem(STORAGE_KEY);

    // If assets exist
    if(data)
    {
        // Convert string back into array
        return JSON.parse(data);
    }

    // If nothing is stored yet
    return [];
}

//Remove All Assets
function clearAssets()
{
    localStorage.removeItem(STORAGE_KEY);
}


// ==========================================
// Save / Load Subscriptions into Local Storage
// ==========================================

function saveSubscriptions(subscriptions)
{
    localStorage.setItem(SUB_STORAGE_KEY, JSON.stringify(subscriptions));
}

function loadSubscriptions()
{
    const data = localStorage.getItem(SUB_STORAGE_KEY);

    if(data)
    {
        return JSON.parse(data);
    }

    return [];
}

function clearSubscriptions()
{
    localStorage.removeItem(SUB_STORAGE_KEY);
}
