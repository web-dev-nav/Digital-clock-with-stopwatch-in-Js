const padSingleDigit = num => num.toString().padStart(2, "0");
const displayCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let ampm = "AM"; // set default value
    
    // correct hours and AM/PM value for display
    if (hours > 12) { // convert from military time
        hours = hours - 12;
        ampm = "PM";
    } else { // adjust 12 noon and 12 midnight
         switch (hours) {
            case 12: // noon
                ampm = "PM";
                break;
            case 0:  // midnight
                hours = 12;
                ampm = "AM";
        }
    }
    
   
    document.querySelector("#hours").innerHTML =  padSingleDigit(hours);
    document.querySelector("#minutes").innerHTML = padSingleDigit(now.getMinutes());
    document.querySelector("#seconds").innerHTML = padSingleDigit(now.getSeconds());
    document.querySelector("#ampm").innerHTML = ampm;
};


//global stop watch timer variableS 
let minute = 0;
let second = 0;
let count = 0;
 
const tickStopwatch = () => {    
    // increment milliseconds by 10 milliseconds

     if (timer) {  //Check if timer var is true
        count++;   //increase milliseconds by 1   
        // if milliseconds total 100, increment seconds by one and reset milliseconds to zero
        if (count == 100) {
            second++;
            count = 0;
        }
         // if seconds total 60, increment minutes by one and reset seconds to zero
        if (second == 60) {
            minute++;
            second = 0;
        }
          // if minute total 60, increment hour by one and reset minutes and seconds to zero
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let minString = minute;
        let secString = second;
        let countString = count;

       // if minute less than 10, padstart minutes with 0 
        if (minute < 10) {
            minString = minString.toString().padStart(2, "0");  //ex: 05 mins
        }

        if (second < 10) {
            secString = secString.toString().padStart(2, "0");  //ex: 05 sec
        }

        if (count < 10) {
            countString = countString.toString().padStart(2, "0"); //ex: 05 count
        }

        //append the values into IDs
        document.getElementById('s_minutes').innerHTML = minString;
        document.getElementById('s_seconds').innerHTML = secString;
        document.getElementById('s_ms').innerHTML = countString;
        setTimeout(tickStopwatch, 10); //set timeout to the function
     }
};

// event handler functions
const startStopwatch = evt => {
    //set timer var true and calling the function
    timer = true;
    tickStopwatch();
    
};

const stopStopwatch = evt => {
    //set timer var false when calling stopStopwatch function
    timer = false;
    // stop timer
    
};

const resetStopwatch = evt => {
    //reset all variables and overwite all ids with 00
    timer = false;
    minute = 0;
    second = 0;
    count = 0;
    document.querySelector('#s_minutes').innerHTML = "00";
    document.querySelector('#s_seconds').innerHTML = "00";
    document.querySelector('#s_ms').innerHTML = "00";
    
};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
	
	
    //calling functions on click
    document.querySelector("#start").addEventListener("click", startStopwatch);
    document.querySelector("#stop").addEventListener("click", stopStopwatch);
    document.querySelector("#reset").addEventListener("click", resetStopwatch);
});
