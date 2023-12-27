// get the from button and save it to local storage
var workoutLinks = document.querySelectorAll(".title-names");
var workoutTitle = localStorage.getItem("title");



//add click event listener to each link
workoutLinks.forEach(function(link){
    link.addEventListener('click', function (event) {
        

        //get text of the clicked link
        var clickedTitle = link.innerText;

        // save the clicked title to local storage
        localStorage.setItem("title", clickedTitle);

    });
});
//0.7 to earse expired timers and change color of elements
document.addEventListener("DOMContentLoaded", function (){
    // Check local storage and remove expired entries
    cleanLocalStorage();

    // looks for elemnets with class "title-names"
    document.querySelectorAll(".title-names").forEach(function(element){
        //get the text content of the current element
        var workoutTitle = element.innerText;

        // check if workout title exists in local storage 
        if (localStorage.getItem(workoutTitle)) {
            //If it exists, remove "Available" and add "not-Available" classes
            element.classList.remove("Available");
            element.classList.add("not-Available");
            
        } else {
            // If it doesn't exist, keep "Available" class and remove "not-Available" class
            element.classList.remove('not-Available');
            element.classList.add('Available');
        }
    })
})

//0.6 function to clean local storage from expired entries 
function cleanLocalStorage(){
    for (var i = 0; i <localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedDate = new Date(localStorage.getItem(key));

        //compare stored date with the current date
        if (storedDate <= new Date()){
            //if stored date is less than or equal to today's date, remove the entry
            localStorage.removeItem(key);
            // index to recheck the current position
            i--;
            location.reload();
        }
    }
    
}