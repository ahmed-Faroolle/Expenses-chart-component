//get all style of the root element 
const getRootVariables = getComputedStyle(document.documentElement);

const colCharts = document.querySelectorAll('.col__chart');
const charts = document.querySelectorAll('.charts');
const dayEls = document.querySelectorAll('[data-day]');
const totalEL = document.querySelector('.total__amount');
const allAmountEls = document.querySelectorAll('.amount');

//weekdays start 0 - 6
const daysArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

//get today's date 0 - 6
const todayDate = new Date().getDay();

//get col chart date based on weekday
const todayChart = document.querySelector(`[data-day=${daysArr[todayDate]}`);

//set background color from css variables
todayChart.parentElement.querySelector('.col__chart').style.backgroundColor = getRootVariables.getPropertyValue('--primary__cyan');

//hide amount from browsers javascript enabled
allAmountEls.forEach(amountEl => amountEl.classList.add('hidden'));

//inserts data into column charts
const insertChartData = function (i , day, amount) {
    
    const amountEl = document.querySelector(`.amount__${i+1}`);
    const colChart = document.querySelector(`.col__${i+1}`);
    amountEl.textContent = amount;
    colChart.style.height = `calc(${amount}px + 10px)`;
}

//fetch json data
async function printJSON() {
    const response = await fetch("data.json");
    const json = await response.json();
    const [chartsData] = json;
    let totalAmount = 0;
    let cDay, cAmount;
    json.forEach((chart, i) => {
        const { day, amount } = chart;
        totalAmount += amount;
        insertChartData(i, day, amount);
    });

    totalEL.textContent = `$${totalAmount}`;
}

printJSON();

//checks if element is targeted
const isInTarget = function (e) {
    const clicked = e.target.classList.contains('col__chart');
    if (!clicked) return false;
    const amount = e.target.parentElement.querySelector('.amount');
    return amount;
}

//event handler that shows amount when column chart is targeted
function showAmount(e) {
    if (!isInTarget(e)) return;
    isInTarget(e).classList.remove('hidden');
}

//event handler that hides amount when column chart is targeted
function hideAmount(e) {
    if (!isInTarget(e)) return;
    isInTarget(e).classList.remove('hidden');
    isInTarget(e).classList.add('hidden');
}

//events
charts.forEach(chart => {
    chart.addEventListener('mouseover', showAmount);
    chart.addEventListener('mouseout', hideAmount);    
})
