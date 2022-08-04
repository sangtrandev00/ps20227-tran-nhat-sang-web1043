
const endDate = document.querySelector("input[name='endDate']");
// console.log(endDate);
const clock = document.querySelector(".clock");
// console.log(clock);

let timeInterval;
let timeStop = true;

const savedValue = localStorage.getItem("countdown") || false;

if(savedValue) {
    startClock(savedValue);
    let inputValue = new Date(savedValue);
    endDate.valueAsDate = inputValue;
}

endDate.addEventListener("change",(e) => {
    e.preventDefault();
    clearInterval(timeInterval);
    const temp = new Date(endDate.value);
    localStorage.setItem("countdown",temp);
    startClock(temp);
    timeStop = true;
})



function timeLeft(d) {
    let currentDate = new Date();
    let t = Date.parse(d) - Date.parse(currentDate);

    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000 / 60) % 60);
    let hours = Math.floor((t/ ( 1000 * 60 * 60)) % 24);
    let days = Math.floor(t/(1000 * 60 * 60 * 24));
    
    return {
        "total" : t,
        "days" : days,
        "hours" : hours,
        "minutes" : minutes,
        "seconds" : seconds
    };
}

function startClock(d) {
    function updateCounter() {

        let tl = (timeLeft(d));
        if(tl.total <= 0) {
            timeStop = false; // Where is time Stop
        }

        for(let pro in tl) {
            let element = clock.querySelector("." + pro);

            if(element) {
                element.innerHTML = tl[pro];
            }
        }
    }

    updateCounter();

    if(timeStop) {
        timeInterval = setInterval(updateCounter,1000);
    } else {
        clearInterval(timeInterval);
    }

}

