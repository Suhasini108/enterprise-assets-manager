// Create chart
const departmentCanvas = document.getElementById("departmentChart");

const departmentChart = new Chart(departmentCanvas, {
    type: "bar",

    data: {
        labels: ["IT", "HR", "Finance", "Marketing"],

        datasets: [{
            label: "Assets",
            data: [0, 0, 0, 0],
            backgroundColor: [
                "#4CAF50",
                "#2196F3",
                "#FFC107",
                "#FF5722"
            ]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// Status Chart

// Get canvas
const statusCanvas = document.getElementById("statusChart");

// Create chart
const statusChart = new Chart(statusCanvas, {

    type: "doughnut",

    data: {

        labels: ["Available", "Assigned", "Repair"],

        datasets: [

            {

                label: "Assets",

                data: [0, 0, 0],

                backgroundColor: [

                    "#4CAF50",
                    "#2196F3",
                    "#FF9800"

                ]

            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});



// Update Status Chart
function updateStatusChart(available, assigned, repair)
{
    statusChart.data.datasets[0].data = [

        available,

        assigned,

        repair

    ];

    statusChart.update();
}

// Function exposed globally
function updateDepartmentChart(it, hr, finance, marketing)
{
    departmentChart.data.datasets[0].data = [
        it,
        hr,
        finance,
        marketing
    ];

    departmentChart.update();
}
