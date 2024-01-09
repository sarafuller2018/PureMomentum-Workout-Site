// Check if theres a user in local storage when page loads
document.addEventListener("DOMContentLoaded", function () {
    var userData = localStorage.getItem("user");


    // If user exists redirect to mainpaige.html
    if (userData) {
        window.location.href = "mainpage.html";
    }
});

function saveToLocalStorage() {
    // Get values from input fields
    var firstName = document.getElementById('login-name').value;
    var lastName = document.getElementById('login-lastName').value;

    // Check if both fields are not empty
    if (firstName && lastName) {
        // Create an object to store the values
        var user = {
            firstName: firstName,
            lastName: lastName
        };

        // Convert the object to a JSON string and store in local storage
        localStorage.setItem('user', JSON.stringify(user));

        // Clear input 
        document.getElementById("login-name").value = "";
        document.getElementById("login-lastName").value = "";
        window.location.href = "mainpage.html";

    } else {
        // Alert the user if any of the fields are empty
        alert('Please fill in both fields before submitting.');
    }
}