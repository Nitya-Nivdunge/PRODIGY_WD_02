// TRANSITION - StopWatch to Timer and vice versa 
var stopwatch_pg = document.getElementById("stopwatch_side");
var timer_pg = document.getElementById("timer_side");
var button = document.getElementById("btn");

function timer_call() {
    stopwatch_pg.style.left = "-500px";
    timer_pg.style.left = "50px";
    button.style.left = "210px";
}

function stopwatch_call() {
    stopwatch_pg.style.left = "50px";
    timer_pg.style.left = "550px";
    button.style.left = "0px";
}

let hr = 0;
let min = 0;
let sec = 0;
let milli = 0;

let watch_on = false;
let first_start_flag = 0;

function start_stopwatch() {
    watch_on = true;
    if (first_start_flag == 0) {
        first_start_flag = 1;
        stopwatch();
    }
}

function pause_stopwatch() {
    watch_on = false;
    first_start_flag = 0;
}


function reset_stopwatch() {
    location.reload();
    first_start_flag = 0;
}

function lap_stopwatch() {
    // Get the current time 
    let h = document.getElementById("hours").innerHTML;
    let m = document.getElementById("minutes").innerHTML;
    let s = document.getElementById("seconds").innerHTML;
    let ms = document.getElementById("milliseconds").innerHTML;

    // Format the lap time 
    let lap_time = `${h} : ${m} : ${s} : ${ms}`;

    // Create a new list item 
    let new_li = document.createElement("li");
    new_li.classList.add("lap-item");

    // Create a new number element 
    let new_number = document.createElement("span");
    new_number.classList.add("number");
    new_number.innerText = `${document.getElementsByClassName("laps")[0].getElementsByClassName("lap-item").length + 1}] `;

    // Create a new lap time element 
    let new_lap_time = document.createElement("span");
    new_lap_time.classList.add("lap-time");
    new_lap_time.innerText = lap_time;

    // Create a new HR element 
    let new_hr = document.createElement("hr");

    // Append the elements to the new list item 
    new_li.appendChild(new_number);
    new_li.appendChild(new_lap_time);
    new_li.appendChild(new_hr);

    // Append the new list item to the unordered list 
    document.getElementsByClassName("laps")[0].appendChild(new_li);
}

function clearLap_stopwatch() {
    // Get the unordered list 
    let laps_list = document.getElementsByClassName("laps")[0];

    // Remove all the list items 
    while (laps_list.firstChild) {
        laps_list.removeChild(laps_list.firstChild);
    }
}

function stopwatch() {

    if (watch_on == true) {

        milli = milli + 1;
        if (milli == 100) {
            sec = sec + 1;
            milli = 0
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
        }
        if (hr == 24) {
            reset_stopwatch();
        }

        var getHr = hr;
        var getMin = min;
        var getS = sec;
        var getMsec = milli;

        if (hr < 10) {
            getHr = "0" + hr;
        }
        if (min < 10) {
            getMin = "0" + min;
        }
        if (sec < 10) {
            getS = "0" + sec;
        }
        if (milli < 10) {
            getMsec = "0" + milli;
        }

        document.getElementById("seconds").innerHTML = getS;
        document.getElementById("minutes").innerHTML = getMin;
        document.getElementById("hours").innerHTML = getHr;
        document.getElementById("milliseconds").innerHTML = getMsec;

        let timeOut = setTimeout("stopwatch()", 7);
    }
}







// Timer - Working

let timer = false;
let start_flag = 0;
let intervalId;

const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const alarm = document.getElementById('alarm');
const startButton = document.getElementById('startButton');
var start_point = document.getElementById("time-msg");

document.addEventListener('DOMContentLoaded', function () {
    // Set min date to today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', todayStr);

    // Set min time ahead of current time
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    timeInput.addEventListener("input", function () {
        const selectedTime = this.value.split(":");
        const selectedHour = parseInt(selectedTime[0]);
        const selectedMinute = parseInt(selectedTime[1]);

        if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute <= currentMinute)) {
            alert("Please select a time ahead of the current time.");
            this.value = "";
        }
    });
});

startButton.addEventListener('click', function () {

    if (!date || !time) {
        alert("Please select both date and time.");
        return;
    }

    start_timer(date, time);
});

function start_timer(date, time) {
    if (timer) return;  // Prevent multiple intervals
    timer = true;
    if (start_flag == 0) {

        const dateParts = date.split('-');
        const timeParts = time.split(':');
        const dest = new Date(
            parseInt(dateParts[0], 10),         // year
            parseInt(dateParts[1], 10) - 1,     // month (0-based)
            parseInt(dateParts[2], 10),         // day
            parseInt(timeParts[0], 10),         // hour
            parseInt(timeParts[1], 10),         // minute
            0                                   // second (assuming input time doesn't include seconds)
        ).getTime();


        intervalId = setInterval(function () {
            let curr = new Date().getTime();
            let diff = dest - curr;

            if (diff < 0) {
                clearInterval(intervalId);
                timer = false;
                start_flag = 0;

                alarm.play();

                setTimeout(function () {
                    alert("Time is up!");
                    alarm.pause();
                    alarm.currentTime = 0;
                }, 1000);

                return;
            }

            // Calculating days, hours, minutes, and seconds
            let day = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hr = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let secs = Math.floor((diff % (1000 * 60)) / 1000);


            // Display

            if (start_flag != 1)      // Displaying the starting point of timer
            {
                start_point.innerHTML = `Timer set for: ${day.toString()} day :: ${hr.toString()} hr :: ${mins.toString()} min :: ${secs.toString()} sec`;
            }


            document.getElementById("day").innerHTML = day.toString().padStart(2, '0');
            document.getElementById("hrs").innerHTML = hr.toString().padStart(2, '0');
            document.getElementById("min").innerHTML = mins.toString().padStart(2, '0');
            document.getElementById("sec").innerHTML = secs.toString().padStart(2, '0');

            start_flag = 1;

        }, 1000);
    }
}

/*
function pause_timer() {
    timer = false;
    start_flag = 0;
    clearInterval(intervalId);
}
*/

function reset_timer() {
    timer = false;
    start_flag = 0;
    clearInterval(intervalId);

    dateInput.value = '';
    timeInput.value = '';

    document.getElementById("day").innerHTML = '00';
    document.getElementById("hrs").innerHTML = '00';
    document.getElementById("min").innerHTML = '00';
    document.getElementById("sec").innerHTML = '00';
}
