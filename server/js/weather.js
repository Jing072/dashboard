// Variabelen
const weatherUrl = '/weather';

const maxTempChart = document.querySelector('.max-temp-chart');
const minTempChart = document.querySelector('.min-temp-chart');
const aveTempChart = document.querySelector('.ave-temp-chart');
const rainChart = document.querySelector('.rain-chart');
const allChart = document.querySelector('.all-chart');

// Fetch naar /weather data
fetch(weatherUrl)
    .then((response) => response.json())
    .then((myData) => {
        console.log(myData[0]);
        const d = myData[0];

        // Charts
        new Chart(maxTempChart, {
            type: 'line',
            data: {
                // Labels voor de dagen
                labels: d.day,
                // Labels en data
                datasets: [
                    {
                        label: 'Max',
                        data: d.maxTemp,
                        borderColor: '#FF6384',
                        backgroundColor: '#FFB1C1'
                    }
                ]
            }
        });

        new Chart(minTempChart, {
            type: 'line',
            data: {
                // Labels voor de dagen
                labels: d.day,
                // Labels en data
                datasets: [
                    {
                        label: 'Min',
                        data: d.minTemp,
                        borderColor: '#FF9F40',
                        backgroundColor: '#FFC183'
                    }
                ]
            }
        });

        new Chart(aveTempChart, {
            type: 'line',
            data: {
                // Labels voor de dagen
                labels: d.day,
                // Labels en data
                datasets: [
                    {
                        label: 'Average',
                        data: d.aveTemp,
                        borderColor: '#FFCD56',
                        backgroundColor: '#FFDF92'
                    }
                ]
            }
        });

        new Chart(rainChart, {
            type: 'line',
            data: {
                // Labels voor de dagen
                labels: d.day,
                // Labels en data
                datasets: [
                    {
                        label: 'Precipitation',
                        data: d.rain,
                        borderColor: '#4BC0C0',
                        backgroundColor: '#A5DFDF'
                    }
                ]
            }
        });

        new Chart(allChart, {
            type: 'line',
            data: {
                // Labels voor de dagen
                labels: d.day,
                // Labels en data
                datasets: [
                    {
                        label: 'Max',
                        data: d.maxTemp,
                        borderColor: '#FF6384',
                        backgroundColor: '#FFB1C1'
                    },
                    {
                        label: 'Min',
                        data: d.minTemp,
                        borderColor: '#FF9F40',
                        backgroundColor: '#FFC183'
                    },
                    {
                        label: 'Average',
                        data: d.aveTemp,
                        borderColor: '#FFCD56',
                        backgroundColor: '#FFDF92'
                    },
                    {
                        label: 'Precipitation',
                        data: d.rain,
                        borderColor: '#4BC0C0',
                        backgroundColor: '#A5DFDF'
                    }
                ]
            }
        });
    });