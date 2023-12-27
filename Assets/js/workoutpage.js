// get the from button and save it to local storage
var workoutLinks = document.querySelectorAll(".title-names");
var workoutTitle = localStorage.getItem("title");



// 0.1 set the text value of the h1 by pulling from local storage 
var workoutNameElement = document.getElementById("workout-name");
if (workoutNameElement) {
    workoutNameElement.innerText = workoutTitle ;
}


//0.2 to check if workout title exist in local storage
function checkWorkoutTitleInLocalStorage(workoutTitle) {
    return localStorage.getItem(workoutTitle) !==null;
}

//0.3 display the date on screen
function displayFinishRestingDay(workoutTitle){
    // get value from local storage using the workout title as the key
    var restingDayValue = localStorage.getItem(workoutTitle);

    // display the value in finish-resting-day element
    var FinishRestingDayElement = document.getElementById("finish-resting-day");
    if (FinishRestingDayElement) {
        FinishRestingDayElement.innerText = restingDayValue;
    }
}

//0.4 finish button adds 7 day to current date and saves to local storage and naming it aftet what the title text is 
document.getElementById("finish-button").addEventListener("click",function(){
    
    if (workoutTitle) {

        // get current date
        var currentDate = new Date();

        // add 1 day to the current date
        var sevenDaysLater = new Date(currentDate.getTime()+ (3 * 24 * 60 * 60 * 1000));

        //saves the calculated date to local storage with workout as  the key
        formattedDate = sevenDaysLater.toLocaleDateString()
        localStorage.setItem(workoutTitle, formattedDate);


        // displays the date in consil 
        console.log( formattedDate + " until " + workoutTitle + " is available");

        // check if workout title exists in local storage and if it does display value
        if (checkWorkoutTitleInLocalStorage(workoutTitle)) {
            displayFinishRestingDay(workoutTitle);

        }
    } else {
        alert('No workout found ')
    }
});


//0.5 check if workout exist in local storage when page loads
var workoutTitleOnLoad =localStorage.getItem('title');
if (workoutTitleOnLoad && checkWorkoutTitleInLocalStorage(workoutTitleOnLoad)) {
    displayFinishRestingDay(workoutTitleOnLoad);
}