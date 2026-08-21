// =============================================
// Subscriptions Management
// =============================================

// Load subscriptions already saved in browser
let subscriptions = loadSubscriptions();

// Stores the ID of the subscription currently being edited
let editingSubId = null;

// -------- HTML Elements --------
const addSubscriptionBtn = document.getElementById("addSubscriptionBtn");
const subscriptionModal = document.getElementById("subscriptionModal");
const closeSubModal = document.getElementById("closeSubModal");
const subscriptionForm = document.getElementById("subscriptionForm");
const subTableBody = document.getElementById("subTableBody");

const searchSubscription = document.getElementById("searchSubscription");
const subCategoryFilter = document.getElementById("subCategoryFilter");
const subStatusFilter = document.getElementById("subStatusFilter");

const exportSubCSVBtn = document.getElementById("exportSubCSVBtn");

const monthlyCostEl = document.getElementById("monthlyCost");
const yearlyCostEl = document.getElementById("yearlyCost");
const expiringAssetsEl = document.getElementById("expiringAssets");

const reportTotalAssetsEl = document.getElementById("reportTotalAssets");
const reportTotalSubsEl = document.getElementById("reportTotalSubs");
const reportYearlyCostEl = document.getElementById("reportYearlyCost");


// -------- Generate Subscription ID --------
function generateSubID()
{
    const timestamp = Date.now();
    return "S" + timestamp.toString().slice(-6);
}


// -------- Create One Subscription Table Row --------
function createSubscriptionRow(sub)
{
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${sub.id}</td>
        <td>${sub.name}</td>
        <td>${sub.category}</td>
        <td>${sub.department}</td>
        <td>$${Number(sub.cost).toFixed(2)}</td>
        <td>${sub.renewalDate}</td>
        <td>${sub.status}</td>
        <td>
            <button class="edit-btn" data-id="${sub.id}">Edit</button>
            <button class="delete-btn" data-id="${sub.id}">Delete</button>
        </td>
    `;

    return newRow;
}


// -------- Display Subscriptions --------
function displaySubscriptions(subList = subscriptions)
{
    subTableBody.innerHTML = "";

    subList.forEach(function(sub)
    {
        const row = createSubscriptionRow(sub);
        subTableBody.appendChild(row);
    });
}


// -------- Apply Filters --------
function applySubFilters()
{
    const searchText = searchSubscription.value.toLowerCase();
    const selectedCategory = subCategoryFilter.value;
    const selectedStatus = subStatusFilter.value;

    const filtered = subscriptions.filter(function(sub)
    {
        const matchesSearch =
            sub.name.toLowerCase().includes(searchText) ||
            sub.department.toLowerCase().includes(searchText) ||
            sub.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "" || sub.category === selectedCategory;

        const matchesStatus =
            selectedStatus === "" || sub.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    displaySubscriptions(filtered);
}


// -------- Update Dashboard Cost Cards --------
function updateCostCards()
{
    let monthlyTotal = 0;
    let expiringCount = 0;

    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    subscriptions.forEach(function(sub)
    {
        if(sub.status === "Active")
        {
            monthlyTotal += Number(sub.cost);

            const renewal = new Date(sub.renewalDate);

            if(renewal >= today && renewal <= in30Days)
            {
                expiringCount++;
            }
        }
    });

    monthlyCostEl.textContent = "$" + monthlyTotal.toFixed(2);
    yearlyCostEl.textContent = "$" + (monthlyTotal * 12).toFixed(2);
    expiringAssetsEl.textContent = expiringCount;

    // Keep the notification bell in sync too (defined in app.js,
    // safe to call here since this only runs after all scripts have loaded)
    if(typeof updateNotifications === "function")
    {
        updateNotifications();
    }
}


// -------- Update Report Section Cards --------
function updateReportCards()
{
    // "assets" is the global array defined in app.js
    reportTotalAssetsEl.textContent = (typeof assets !== "undefined") ? assets.length : 0;
    reportTotalSubsEl.textContent = subscriptions.length;
    reportYearlyCostEl.textContent = yearlyCostEl.textContent;
}


// -------- Open / Close Modal --------
addSubscriptionBtn.addEventListener("click", function()
{
    editingSubId = null;
    subscriptionForm.reset();
    document.getElementById("subModalTitle").textContent = "Add New Subscription";
    subscriptionModal.style.display = "flex";
});

closeSubModal.addEventListener("click", function()
{
    editingSubId = null;
    subscriptionForm.reset();
    subscriptionModal.style.display = "none";
});


// -------- Edit / Delete --------
subTableBody.addEventListener("click", function(event)
{
    const subId = event.target.dataset.id;

    if(event.target.classList.contains("delete-btn"))
    {
        const sub = subscriptions.find(function(item){ return item.id === subId; });

        const confirmDelete = confirm(`Are you sure you want to delete "${sub.name}"?`);

        if(!confirmDelete)
        {
            return;
        }

        subscriptions = subscriptions.filter(function(item){ return item.id !== subId; });

        addActivity(`Deleted subscription ${sub.name}`);

        saveSubscriptions(subscriptions);

        applySubFilters();
        updateCostCards();
        updateReportCards();
    }

    if(event.target.classList.contains("edit-btn"))
    {
        editingSubId = subId;

        const sub = subscriptions.find(function(item){ return item.id === subId; });

        document.getElementById("subName").value = sub.name;
        document.getElementById("subCategory").value = sub.category;
        document.getElementById("subDepartment").value = sub.department;
        document.getElementById("subCost").value = sub.cost;
        document.getElementById("subRenewalDate").value = sub.renewalDate;
        document.getElementById("subStatus").value = sub.status;

        document.getElementById("subModalTitle").textContent = "Edit Subscription";

        subscriptionModal.style.display = "flex";
    }
});


// -------- Form Submit (Add / Update) --------
subscriptionForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    const name = document.getElementById("subName").value;
    const category = document.getElementById("subCategory").value;
    const department = document.getElementById("subDepartment").value;
    const cost = document.getElementById("subCost").value;
    const renewalDate = document.getElementById("subRenewalDate").value;
    const status = document.getElementById("subStatus").value;

    if(editingSubId === null)
    {
        const sub = {
            id: generateSubID(),
            name,
            category,
            department,
            cost,
            renewalDate,
            status
        };

        subscriptions.push(sub);
        addActivity(`Added subscription ${sub.name}`);
    }
    else
    {
        const sub = subscriptions.find(function(item){ return item.id === editingSubId; });

        sub.name = name;
        sub.category = category;
        sub.department = department;
        sub.cost = cost;
        sub.renewalDate = renewalDate;
        sub.status = status;

        addActivity(`Updated subscription ${sub.name}`);
        editingSubId = null;
    }

    saveSubscriptions(subscriptions);

    applySubFilters();
    updateCostCards();
    updateReportCards();

    subscriptionModal.style.display = "none";
    subscriptionForm.reset();
});


// -------- Export Subscriptions CSV --------
function exportSubscriptionsCSV()
{
    if(subscriptions.length === 0)
    {
        alert("No subscriptions available to export.");
        return;
    }

    let csv = "ID,Name,Category,Department,Monthly Cost,Renewal Date,Status\n";

    subscriptions.forEach(function(sub)
    {
        csv += `"${sub.id}","${sub.name}","${sub.category}","${sub.department}","${sub.cost}","${sub.renewalDate}","${sub.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "enterprise-subscriptions.csv";
    link.click();

    URL.revokeObjectURL(url);
}

exportSubCSVBtn.addEventListener("click", exportSubscriptionsCSV);


// -------- Search & Filters --------
searchSubscription.addEventListener("input", applySubFilters);
subCategoryFilter.addEventListener("change", applySubFilters);
subStatusFilter.addEventListener("change", applySubFilters);
