// Get the from button and save it to local storage
var workoutLinks = document.querySelectorAll(".title-names");
var workoutTitle = localStorage.getItem("title");
var displayOverrideButton = document.getElementById("overrideTimer")


// get value from local storage using the workout title as the key
var restingDayValue = localStorage.getItem(workoutTitle);
// 0.1 Set the text value of the h1 by pulling from local storage 



var workoutNameElement = document.getElementById("workout-name");
if (workoutNameElement) {
    workoutNameElement.innerText = workoutTitle;
}

//0.2 To check if workout title exist in local storage
function checkWorkoutTitleInLocalStorage(workoutTitle) {
    return localStorage.getItem(workoutTitle) !== null;
}

//0.3 Display the date on screen
function displayFinishRestingDay(workoutTitle) {
    // Get value from local storage using the workout title as the key
    var restingDayValue = localStorage.getItem(workoutTitle);

    // Display the value in finish-resting-day element
    var FinishRestingDayElement = document.getElementById("finish-resting-day");
    var RestingDayValueEl = document.getElementById("restingDayValue");

    if (FinishRestingDayElement) {
        FinishRestingDayElement.innerText = "Exercise will be available on: ";
        RestingDayValueEl.innerText = restingDayValue;
        displayOverrideButton.style.display = "inline"
    }


}

//0.4 Finish button adds 7 day to current date and saves to local storage and naming it aftet what the title text is 
document.getElementById("finish-button").addEventListener("click", function () {

    if (workoutTitle) {

        // Get current date
        var currentDate = new Date();

        // Add 1 day to the current date
        var sevenDaysLater = new Date(currentDate.getTime() + (3 * 24 * 60 * 60 * 1000));

        // Saves the calculated date to local storage with workout as  the key
        formattedDate = sevenDaysLater.toLocaleDateString()
        localStorage.setItem(workoutTitle, formattedDate);

        // Displays the date in console
        console.log(formattedDate + " until " + workoutTitle + " is available");

        // Check if workout title exists in local storage and if it does display value
        if (checkWorkoutTitleInLocalStorage(workoutTitle)) {
            displayFinishRestingDay(workoutTitle);

        } else {
            alert('No workout found ')
        }
    }
});

//0.5 Check if workout exist in local storage when page loads
var workoutTitleOnLoad = localStorage.getItem('title');
if (workoutTitleOnLoad && checkWorkoutTitleInLocalStorage(workoutTitleOnLoad)) {
    displayFinishRestingDay(workoutTitleOnLoad);
}

//------- exercise API ----------//

// Getting the title text as the exercise name 
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
    // Checks if the response is an array and has at least 5 items
    if (Array.isArray(response) && response.length >= 5) {
        // Makes the array a random order 
        const shuffleExercises = response.sort(() => Math.random() - 0.5);
        // Get the first 5 items from the array
        const randomExercises = shuffleExercises.slice(0, 5);

        // Get id element from html
        const container = $("#exerciseContainer");

        // Variable to keep track of the currently active exerciseDiv
        let activeExerciseDiv = null;

        // Clears container
        container.empty();

        // Loop through exercises and append them to the container
        randomExercises.forEach((exercise, index) => {
            // Create a unique ID for each div
            const divID = "exerciseDiv" + index;

            // Check if there's a timer on this page and if there is, don't show exercises
            if (!checkWorkoutTitleInLocalStorage(workoutTitle)) {
                const exerciseDiv = $("<div>").attr("id", divID).addClass("exercise-styling bg-green-600");

                // Create element 
                const exerciseName = $("<h1>").attr('id', divID).text("Exercise: " + exercise.name);
                exerciseName.addClass("font-bold text-2xl namePadding");
                const exercisedifficulty = $("<p>").attr('id', divID).text("Difficulty: " + exercise.difficulty);
                const exerciseequipment = $("<p>").attr('id', divID).text("Equipment: " + exercise.equipment);
                const exerciseinstructions = $("<p>").attr('id', divID).text("Instructions: " + exercise.instructions);
                const exercisemuscle = $("<p>").attr('id', divID).text("Muscle: " + exercise.muscle);
                const exercisetype = $("<p>").attr('id', divID).text("Type: " + exercise.type);
                const closeButton = $("<button>").text("Close").addClass("closeButton bg-green-300 border-black border-2");

                // Appends each element inside a div 
                exerciseDiv.append(exerciseName);
                exerciseDiv.append(exercisemuscle);
                exerciseDiv.append(exercisetype);
                exerciseDiv.append(exercisedifficulty);
                exerciseDiv.append(exerciseequipment);
                exerciseDiv.append(exerciseinstructions);
                exerciseDiv.append(closeButton);

                // Appends all the divs inside the container
                container.append(exerciseDiv);

                // give a click event listener to the exerciseDiv
                exerciseDiv.on('click', function (event) {
                    event.stopPropagation(); // stops the event listener from reaching the parent element

                    // Check if another exerciseDiv is active, and reset its styles
                    if (activeExerciseDiv && activeExerciseDiv !== exerciseDiv) {
                        activeExerciseDiv.css({
                            'height': '115px',
                            'width': '50vw',
                            'border': '1px solid black'
                        });
                    }

                    // change the height, width, and border properties when clicked
                    exerciseDiv.css({
                        'height': 'fit-content',
                        'width': 'fit-content',
                        'border': '4px solid rgb(37, 99, 235)'
                    });

                    // set the curent clicked element 
                    activeExerciseDiv = exerciseDiv;
                });
                closeButton.on("click", function (event) {
                    event.stopPropagation();

                    //reset the styling
                    exerciseDiv.css({
                        'height': '115px',
                        'width': '50vw',
                        'border': '1px solid black'
                    });
                });
            }
        });

        console.log(randomExercises);
    }
});

// Clear timer 
function overrideAndErase(event) {
    // Erase the item in local storage
    localStorage.removeItem(workoutTitleOnLoad);

    // Refresh the page
    location.reload();
    // Prevent the default form submission behavior
    event.preventDefault();
}
document.getElementById("overrideTimer").addEventListener("click", function (event) {
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