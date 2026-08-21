// =============================
// Getting HTML Elements
// =============================

const addAssetBtn = document.getElementById("addAssetBtn");

const assetModal = document.getElementById("assetModal");

const closeModal = document.getElementById("closeModal");

const dashboardLink = document.getElementById("dashboardLink");
const assetsLink = document.getElementById("assetsLink");
const subscriptionsLink = document.getElementById("subscriptionsLink");
const reportLink = document.getElementById("reportLink");
const settingsLink = document.getElementById("settingsLink");
const logoutLink = document.getElementById("logoutLink");

const dashboardSection = document.getElementById("dashboardSection");
const assetsSection = document.getElementById("assetsSection");
const subscriptionsSection = document.getElementById("subscriptionsSection");
const reportSection = document.getElementById("reportSection");
const settingsSection = document.getElementById("settingsSection");

const tableBody = document.getElementById("tableBody");

const searchInput = document.getElementById("searchAsset");

const departmentFilter = document.getElementById("departmentFilter");

const statusFilter = document.getElementById("statusFilter");

const totalAssets = document.getElementById("totalAssets");
const assignedAssets = document.getElementById("assignedAssets");
const availableAssets = document.getElementById("availableAssets");
const repairAssets = document.getElementById("repairAssets");
const totalEmployees = document.getElementById("totalEmployees");

const exportCSVBtn = document.getElementById("exportCSVBtn");
const themeBtn = document.getElementById("theme-btn");

const resetDataBtn = document.getElementById("resetDataBtn");
const reportExportAssetsBtn = document.getElementById("reportExportAssetsBtn");
const reportExportSubsBtn = document.getElementById("reportExportSubsBtn");

const globalSearch = document.getElementById("globalSearch");
const notificationBtn = document.getElementById("notification-btn");
const notifDropdown = document.getElementById("notifDropdown");
const notifBadge = document.getElementById("notifBadge");


// ====================================
// Dark Mode
// ====================================

themeBtn.addEventListener("click", function()
{
    // Toggle dark mode
    document.body.classList.toggle("dark-mode");

    // Check current mode
    if(document.body.classList.contains("dark-mode"))
    {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";
    }
    else
    {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";
    }
});

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark")
{
    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";
}


// ====================================
// Export Assets CSV
// ====================================

function exportAssetsCSV()
{
    // If there are no assets
    if(assets.length === 0)
    {
        alert("No assets available to export.");
        return;
    }

    // CSV header
    let csv = "ID,Asset Name,Category,Employee,Department,Status,Purchase Date\n";

    // Add every asset
    assets.forEach(function(asset)
    {
        csv += `"${asset.id}","${asset.assetName}","${asset.category}","${asset.employee}","${asset.department}","${asset.status}","${asset.purchaseDate}"\n`;
    });

    // Create a file from CSV data
    const blob = new Blob([csv], {
        type: "text/csv"
    });

    // Create temporary download link
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "enterprise-assets.csv";

    // Start download
    link.click();

    // Remove temporary URL
    URL.revokeObjectURL(url);
}

exportCSVBtn.addEventListener("click", exportAssetsCSV);


// Load assets already saved in browser
let assets = loadAssets();

// Stores the ID of the asset currently being edited
let editingAssetId = null;

function generateAssetID()
{
    // Get current timestamp
    const timestamp = Date.now();

    // Take last 6 digits
    return "A" + timestamp.toString().slice(-6);
}


// Create One Asset Table Row
function createAssetRow(asset)
{
    // Create a table row
    const newRow = document.createElement("tr");

    // Fill the row with asset details
    newRow.innerHTML = `
        <td>${asset.id}</td>
        <td>${asset.assetName}</td>
        <td>${asset.category}</td>
        <td>${asset.employee}</td>
        <td>${asset.department}</td>
        <td>${asset.status}</td>
        <td>${asset.purchaseDate}</td>

        <td>

            <button
                class="edit-btn"
                data-id="${asset.id}">
                Edit
            </button>

            <button
                class="delete-btn"
                data-id="${asset.id}">
                Delete
            </button>

        </td>
    `;

    // Return the completed row
    return newRow;
}


function displayAssets(assetList = assets)
{
    // Clear existing rows
    tableBody.innerHTML = "";


    assetList.forEach(function(asset)
    {
        // Create one row
        const row = createAssetRow(asset);

        // Add row to table
        tableBody.appendChild(row);
    });
}


// Update Dashboard Cards
function updateDashboard()
{
    // Total assets
    totalAssets.textContent = assets.length;

    // Assigned assets
    const assignedCount = assets.filter(function(asset)
    {
        return asset.status === "Assigned";
    }).length;

    assignedAssets.textContent = assignedCount;

    // Available assets
    const availableCount = assets.filter(function(asset)
    {
        return asset.status === "Available";
    }).length;

    availableAssets.textContent = availableCount;

    // Repair assets
    const repairCount = assets.filter(function(asset)
    {
        return asset.status === "Repair";
    }).length;

    repairAssets.textContent = repairCount;

    // Unique employees
    const employees = new Set();

    assets.forEach(function(asset)
    {
        if(asset.employee.trim() !== "")
        {
            employees.add(asset.employee);
        }
    });

    totalEmployees.textContent = employees.size;
}

// ====================================
// Apply All Filters
// ====================================

function applyFilters()
{
    // Read all filter values
    const searchText = searchInput.value.toLowerCase();
    const selectedDepartment = departmentFilter.value;
    const selectedStatus = statusFilter.value;

    // Filter assets
    const filteredAssets = assets.filter(function(asset)
    {
        // Search condition
        const matchesSearch =
            asset.assetName.toLowerCase().includes(searchText) ||
            asset.employee.toLowerCase().includes(searchText) ||
            asset.department.toLowerCase().includes(searchText) ||
            asset.category.toLowerCase().includes(searchText);

        // Department condition
        const matchesDepartment =
            selectedDepartment === "" ||
            asset.department === selectedDepartment;

        // Status condition
        const matchesStatus =
            selectedStatus === "" ||
            asset.status === selectedStatus;

        // Asset must satisfy ALL conditions
        return matchesSearch &&
               matchesDepartment &&
               matchesStatus;
    });

    displayAssets(filteredAssets);
}


// ====================================
// Delete Asset
// ====================================

tableBody.addEventListener("click", function(event)
{
    if(event.target.classList.contains("delete-btn"))
    {
        const assetId = event.target.dataset.id;

        // Find the asset
        const asset = assets.find(function(item)
        {
            return item.id === assetId;
        });

        // Ask for confirmation
        const confirmDelete = confirm(
            `Are you sure you want to delete "${asset.assetName}"?`
        );

        // If user clicks Cancel
        if(!confirmDelete)
        {
            return;
        }

        // Delete asset
        assets = assets.filter(function(item)
        {
            return item.id !== assetId;
        });

        // Add activity
        addActivity(`Deleted ${asset.assetName}`);

        // Save updated assets
        saveAssets(assets);

        // Refresh everything
        applyFilters();
        updateDashboard();
        refreshDepartmentChart();
        refreshStatusChart();
        updateReportCards();
        updateNotifications();
    }
});


// ====================================
// Edit Asset
// ====================================

tableBody.addEventListener("click", function(event)
{
    if(event.target.classList.contains("edit-btn"))
    {
        // Get the asset ID
        const assetId = event.target.dataset.id;

        // Remember which asset is being edited
        editingAssetId = assetId;

        // Find the asset object
        const asset = assets.find(function(item)
        {
            return item.id === assetId;
        });

        // Fill all form fields
        document.getElementById("assetName").value = asset.assetName;

        document.getElementById("category").value = asset.category;

        document.getElementById("employee").value = asset.employee;

        document.getElementById("department").value = asset.department;

        document.getElementById("purchaseDate").value = asset.purchaseDate;

        document.getElementById("status").value = asset.status;

        document.getElementById("assetModalTitle").textContent = "Edit Asset";

        // Open the modal
        assetModal.style.display = "flex";
    }
});


// ====================================
// Open / Close Asset Modal
// (FIX: reset editingAssetId + form so a cancelled edit
// never leaks into the next "Add Asset")
// ====================================

addAssetBtn.addEventListener("click", function()
{
    editingAssetId = null;
    assetForm.reset();
    document.getElementById("assetModalTitle").textContent = "Add New Asset";
    assetModal.style.display = "flex";
});

closeModal.addEventListener("click", function()
{
    editingAssetId = null;
    assetForm.reset();
    assetModal.style.display = "none";
});


// ====================================
// Asset Form
// ====================================

const assetForm = document.getElementById("assetForm");

assetForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    const assetName = document.getElementById("assetName").value;
    const category = document.getElementById("category").value;
    const employee = document.getElementById("employee").value;
    const department = document.getElementById("department").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const status = document.getElementById("status").value;

    // Check if Editing or Adding
    if(editingAssetId === null)
    {
        // ---------- Add New Asset ----------

        const asset = {
            id: generateAssetID(),
            assetName,
            category,
            employee,
            department,
            purchaseDate,
            status
        };

        // Add asset into array
        assets.push(asset);
        addActivity(`Added ${asset.assetName}`);
    }
    else
    {
        // ---------- Update Existing Asset ----------

        const asset = assets.find(function(item)
        {
            return item.id === editingAssetId;
        });

        // Update values
        asset.assetName = assetName;
        asset.category = category;
        asset.employee = employee;
        asset.department = department;
        asset.purchaseDate = purchaseDate;
        asset.status = status;

        // Editing finished
        addActivity(`Updated ${asset.assetName}`);
        editingAssetId = null;
    }

    // Save into Local Storage
    saveAssets(assets);

    applyFilters();

    // Refresh Dashboard
    updateDashboard();

    // Refresh Charts (single correct call each - no redundant blank call)
    refreshDepartmentChart();
    refreshStatusChart();

    // Refresh Reports
    updateReportCards();
    updateNotifications();

    assetModal.style.display = "none";
    assetForm.reset();
});


function refreshDepartmentChart()
{
    let it = 0;
    let hr = 0;
    let finance = 0;
    let marketing = 0;

    assets.forEach(function(asset)
    {
        if(asset.department === "IT")
            it++;

        else if(asset.department === "HR")
            hr++;

        else if(asset.department === "Finance")
            finance++;

        else if(asset.department === "Marketing")
            marketing++;
    });

    updateDepartmentChart(it, hr, finance, marketing);
}

function refreshStatusChart()
{
    let available = 0;
    let assigned = 0;
    let repair = 0;

    assets.forEach(function(asset)
    {
        if(asset.status === "Available")
        {
            available++;
        }
        else if(asset.status === "Assigned")
        {
            assigned++;
        }
        else if(asset.status === "Repair")
        {
            repair++;
        }
    });

    updateStatusChart(
        available,
        assigned,
        repair
    );
}


// ====================================
// Sidebar Navigation
// (FIX: now switches between all 5 sections, not just 2,
// using the .active-section class from dashboard.css)
// ====================================

const allSections = [
    dashboardSection,
    assetsSection,
    subscriptionsSection,
    reportSection,
    settingsSection
];

const allNavLinks = [
    dashboardLink,
    assetsLink,
    subscriptionsLink,
    reportLink,
    settingsLink
];

function showSection(sectionToShow, linkToActivate)
{
    allSections.forEach(function(section)
    {
        section.classList.remove("active-section");
    });

    sectionToShow.classList.add("active-section");

    allNavLinks.forEach(function(link)
    {
        link.classList.remove("active");
    });

    if(linkToActivate)
    {
        linkToActivate.classList.add("active");
    }
}

dashboardLink.addEventListener("click", function(event)
{
    event.preventDefault();
    showSection(dashboardSection, dashboardLink);
});

assetsLink.addEventListener("click", function(event)
{
    event.preventDefault();
    showSection(assetsSection, assetsLink);
});

subscriptionsLink.addEventListener("click", function(event)
{
    event.preventDefault();
    showSection(subscriptionsSection, subscriptionsLink);
});

reportLink.addEventListener("click", function(event)
{
    event.preventDefault();
    updateReportCards();
    showSection(reportSection, reportLink);
});

settingsLink.addEventListener("click", function(event)
{
    event.preventDefault();
    showSection(settingsSection, settingsLink);
});

logoutLink.addEventListener("click", function(event)
{
    event.preventDefault();

    const confirmLogout = confirm("Are you sure you want to log out?");

    if(confirmLogout)
    {
        // No backend/auth in this project - simply return to the dashboard view
        showSection(dashboardSection, dashboardLink);
        alert("You have been logged out.");
    }
});


// ====================================
// Header Search Bar
// Typing here jumps to Assets and filters the table live,
// staying in sync with the Assets section's own search box.
// ====================================

globalSearch.addEventListener("input", function()
{
    showSection(assetsSection, assetsLink);
    searchInput.value = globalSearch.value;
    applyFilters();
});


// ====================================
// Notification Bell
// Shows subscriptions renewing within 30 days
// and assets currently under repair.
// ====================================

function updateNotifications()
{
    const items = [];

    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    // Expiring subscriptions
    if(typeof subscriptions !== "undefined")
    {
        subscriptions.forEach(function(sub)
        {
            if(sub.status === "Active")
            {
                const renewal = new Date(sub.renewalDate);

                if(renewal >= today && renewal <= in30Days)
                {
                    items.push(`⏰ "${sub.name}" renews on ${sub.renewalDate}`);
                }
            }
        });
    }

    // Assets under repair
    const repairCount = assets.filter(function(asset)
    {
        return asset.status === "Repair";
    }).length;

    if(repairCount > 0)
    {
        items.push(`🛠 ${repairCount} asset(s) currently under repair`);
    }

    // Render dropdown
    if(items.length === 0)
    {
        notifDropdown.innerHTML = `<p class="notif-empty">No new notifications</p>`;
        notifBadge.style.display = "none";
    }
    else
    {
        notifDropdown.innerHTML = items
            .map(function(text){ return `<div class="notif-item">${text}</div>`; })
            .join("");

        notifBadge.textContent = items.length;
        notifBadge.style.display = "inline-block";
    }
}

notificationBtn.addEventListener("click", function(event)
{
    event.stopPropagation();
    notifDropdown.classList.toggle("show");
});

// Close the dropdown when clicking anywhere else on the page
document.addEventListener("click", function()
{
    notifDropdown.classList.remove("show");
});


// ====================================
// Settings - Reset All Data
// ====================================

resetDataBtn.addEventListener("click", function()
{
    const confirmReset = confirm(
        "This will permanently delete all assets, subscriptions, and activity history stored in this browser. Continue?"
    );

    if(!confirmReset)
    {
        return;
    }

    clearAssets();
    clearSubscriptions();
    localStorage.removeItem("recentActivities");

    assets = [];
    subscriptions = [];

    applyFilters();
    applySubFilters();
    updateDashboard();
    refreshDepartmentChart();
    refreshStatusChart();
    updateCostCards();
    updateReportCards();
    updateNotifications();
    displayActivities();

    alert("All data has been reset.");
});


// ====================================
// Reports - Export Buttons
// ====================================

reportExportAssetsBtn.addEventListener("click", exportAssetsCSV);
reportExportSubsBtn.addEventListener("click", exportSubscriptionsCSV);


// ====================================
// Search / Filters (Assets)
// ====================================

searchInput.addEventListener("input", applyFilters);
departmentFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);


// ====================================
// Initial Page Load
// ====================================

showSection(dashboardSection, dashboardLink);

applyFilters();
updateDashboard();
refreshDepartmentChart();
refreshStatusChart();

applySubFilters();
updateCostCards();
updateReportCards();
updateNotifications();
