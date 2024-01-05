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
        FinishRestingDayElement.innerText = "Exercise will be available on : "+ restingDayValue;
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


//-------exercises API ----------//

// getting the title text as the exercise name 
var muscle = workoutTitle
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?' + muscle,
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '837bd24d63mshff4c202742d0dbfp14a012jsn2368043f393c',
		'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
    // checks if the response is an array and has at least 5 items
    if (Array.isArray(response) && response.length >= 5) {
        //makes the array a random order 
        const shuffleExercises = response.sort(() => Math.random() - 0.5);
        // get the first 5 items from the array
        const randomExercises = shuffleExercises.slice(0, 5);

        // get id element from html
        const container = $("#exerciseContainer");

        // clears container
        container.empty();

        // loop through exercises and append them to the container
        randomExercises.forEach((exercise, index) => {
            // create a unique ID for each div
            const divID = "exerciseDiv" + index;

            //check if theres a timer on this page and if there is dont show exercises
            if (!checkWorkoutTitleInLocalStorage(workoutTitle)) {
               const exerciseDiv = $("<div>").attr("id", divID).addClass("exercise-styling"); 

                // create element 
                const exerciseName = $("<h1>").attr('id',divID).text("Exercise: " + exercise.name);
                const exercisedifficulty = $("<p>").attr('id',divID).text("Difficulty: " + exercise.difficulty);
                const exerciseequipment = $("<p>").attr('id',divID).text("Equipment: " + exercise.equipment);
                const exerciseinstructions= $("<p>").attr('id',divID).text("Instructions: " + exercise.instructions);
                const exercisemuscle= $("<p>").attr('id',divID).text("Muscle: " + exercise.muscle);
                const exercisetype= $("<p>").attr('id',divID).text("Type: " + exercise.type);
                
                // appends each element inside a div 
                exerciseDiv.append (exerciseName);
                exerciseDiv.append (exercisemuscle);
                exerciseDiv.append (exercisetype);
                exerciseDiv.append (exercisedifficulty);
                exerciseDiv.append (exerciseequipment);
                exerciseDiv.append (exerciseinstructions);


                // appends all the divs inside the container
                container.append(exerciseDiv);
            }else {
                null
            }
            


            

        })


        console.log(randomExercises);
    }
})
function overrideAndErase(event) {
    // Erase the item in local storage
    localStorage.removeItem(workoutTitleOnLoad);
    
    // Refresh the page
    location.reload();
    // Prevent the default form submission behavior
    event.preventDefault();
}
document.getElementById("overrideTimer").addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Ask for confirmation
    var userConfirmed = window.confirm('Are you sure you want to override the timer?');

    // Check user's response
    if (userConfirmed) {
        // Call the overrideAndErase function
        overrideAndErase();
    } else {
        null
    }
});