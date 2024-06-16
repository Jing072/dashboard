// Variabelen
const parttimeJobUrl = "/parttime-job";

const workHours = document.querySelector(".work-hours");
const workWeeks = document.querySelector(".work-weeks");
const workMonths = document.querySelector(".work-months");
const salary = document.querySelector(".month-salary");

// Fetchen naar /parttime-job data
fetch("/parttime-job")
    .then((response) => response.json())
    .then((getData) => createChart(getData));

// Het maken van de charts
function createChart(getData) {

    const parttimeJobData = getData[0];

    // workHours chart
    new Chart(workHours, {
        type: "line",
        data: {
            // labels voor dagen
            labels: parttimeJobData.days,
            // labels en data
            datasets: [
                {
                    label: "aantal uren",
                    data: parttimeJobData.workHours,
                }
            ]
        }
    });

    // workWeeks chart
    new Chart(workWeeks, {
        type: "line",
        data: {
            // label voor week
            labels: parttimeJobData.week,
            // labels en data
            datasets: [
                {
                    label: "aantal werkdagen",
                    data: parttimeJobData.workWeeks,
                    borderColor: '#FF6384',
                    backgroundColor: '#FFB1C1'
                }
            ]
        }
    });

    // workMonths chart
    new Chart(workMonths, {
        type: "line",
        data: {
            // label voor maand
            labels: parttimeJobData.month,
            // labels en data
            datasets: [
                {
                    label: "aantal werkdagen",
                    data: parttimeJobData.workMonths,
                    borderColor: '#FF9F40',
                    backgroundColor: '#FFC183'
                }
            ]
        }
    });

    // salary chart
    new Chart(salary, {
        type: "bar",
        data: {
            // label voor maand
            labels: parttimeJobData.month,
            // labels en data
            datasets: [
                {
                    label: "Salaris per maand",
                    data: parttimeJobData.monthSalary,
                    borderColor: '#FFCD56',
                    backgroundColor: '#FFDF92'
                }
            ]
        }
    });

}