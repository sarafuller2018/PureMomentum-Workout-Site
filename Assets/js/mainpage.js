var airQualityAPIKey = "i6LcwnE1XmJW9BYpwnKgxQ==38aYAMDm6to7ByqZ";
var airQualityEl = document.getElementById("airQualityInformation");
var localCityNameEl = document.getElementById("localCityName");
var localCitySubmitButtonEl = document.getElementById("localCitySubmitButton");

// Get the title from button and save it to local storage
var workoutLinks = document.querySelectorAll(".title-names");
var workoutTitle = localStorage.getItem("title");

// Add click event listener to each link
workoutLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {

        // Get text of the clicked link
        var clickedTitle = link.innerText;

        // Save the clicked title to local storage
        localStorage.setItem("title", clickedTitle);

    });
});

//0.7 To erase expired timers and change color of elements
document.addEventListener("DOMContentLoaded", function () {
    // Check local storage and remove expired entries
    cleanLocalStorage();

    // Looks for elemnets with class "title-names"
    document.querySelectorAll(".title-names").forEach(function (element) {
        // Get the text content of the current element
        var workoutTitle = element.innerText;

        // Check if workout title exists in local storage 
        if (localStorage.getItem(workoutTitle)) {
            // If it exists, remove "Available" and add "not-Available" classes
            element.classList.remove("Available");
            element.classList.add("not-Available");

        } else {
            // If it doesn't exist, keep "Available" class and remove "not-Available" class
            element.classList.remove('not-Available');
            element.classList.add('Available');
        }
    });
});

//0.6 Function to clean local storage from expired entries 
function cleanLocalStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedDate = new Date(localStorage.getItem(key));

        // Compare stored date with the current date
        if (storedDate <= new Date()) {
            // If stored date is less than or equal to today's date, remove the entry
            localStorage.removeItem(key);
            // Index to recheck the current position
            i--;
            location.reload();
        }
    }
};

// Check if there is a city saved to local storage when page loads
// Call API with that city if yes
document.addEventListener("DOMContentLoaded", function () {
    var savedCity = localStorage.getItem("city");
    console.log(savedCity);

    // If city exists call airquality function
    if (savedCity) {
        getAirQuality(savedCity);
    }
});

// Calling air quality API function on submit of new city
localCitySubmitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    var city = localCityNameEl.value;
    console.log(city);

    localStorage.setItem("city", city);

    getAirQuality(city);
});

// Gets air quality and appends to the page
function getAirQuality(city) {
    var createAirQualityInfoDiv = document.createElement("div");
    var airQualityValue = document.createElement("p");
    var createAQIRating = document.createElement("p");
    var createAQIDescription = document.createElement("p");

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/airquality?city=' + city,
        headers: { 'X-Api-Key': airQualityAPIKey },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);

            airQualityEl.innerHTML = "";
            airQualityValue.textContent = city + " Local AQI: " + result.overall_aqi;
            createAirQualityInfoDiv.appendChild(airQualityValue);
            airQualityEl.appendChild(createAirQualityInfoDiv);

            if (result.overall_aqi <= 50) {
                createAQIRating.textContent = "Green: Good";
                createAQIDescription.textContent = "Air quality is satisfactory, and air pollution poses little or no risk."
                // highlight this green
                createAQIRating.classList.add("bg-green-400");
            } else if (51 <= result.overall_aqi && result.overall_aqi <= 100) {
                createAQIRating.textContent = "Yellow: Moderate";
                createAQIDescription.textContent = "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
                // highlight this yellow
                createAQIRating.classList.add("bg-yellow-400");
            } else if (101 <= result.overall_aqi && result.overall_aqi <= 150) {
                createAQIRating.textContent = "Orange: Unhealthy for Sensitive Groups";
                createAQIDescription.textContent = "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
                // highlight this orange
                createAQIRating.classList.add("bg-orange-400");
            } else if (151 <= result.overall_aqi && result.overall_aqi <= 200) {
                createAQIRating.textContent = "Red: Unhealthy";
                createAQIDescription.textContent = "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
                // highlight this light red
                createAQIRating.classList.add("bg-red-200");
            } else if (201 <= result.overall_aqi && result.overall_aqi <= 300) {
                createAQIRating.textContent = "Purple: Very Unhealthy";
                createAQIDescription.textContent = "Health alert: The risk of health effects is increased for everyone."
                // highlight this purple
                createAQIRating.classList.add("bg-purple-400");
            } else {
                createAQIRating.textContent = "Maroon: Hazardous";
                createAQIDescription.textContent = "Health warning of emergency conditions: everyone is more likely to be affected."
                // highlight this dark red
                createAQIRating.classList.add("bg-red-700");
            };

            createAirQualityInfoDiv.appendChild(createAQIRating);
            createAirQualityInfoDiv.appendChild(createAQIDescription);
        },

        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
};