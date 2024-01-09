var journalEntryEl = document.getElementById("journalEntry");
var journalEntrySubmitButtonEl = document.getElementById("submitJournalButton");
var currentJournalEl = document.getElementById("currentJournal");
var previousJournalsEl = document.getElementById("previousJournals");
var savedJournalArray = [];

// Checks local storage for previous journal entries and adds to the array if so
if (JSON.parse(localStorage.getItem("journals")) !== null) {
    savedJournalArray = JSON.parse(localStorage.getItem("journals"));
};

// Appends current journal and adds to local storage on submit 
journalEntrySubmitButtonEl.addEventListener("click", function () {

    var journalEntry = journalEntryEl.value;
    console.log(journalEntry);

    if (journalEntry !== "") {
        var addCurrentJournalEl = document.createElement("li");
        addCurrentJournalEl.textContent = journalEntry;
        currentJournalEl.appendChild(addCurrentJournalEl);

        savedJournalArray.unshift(journalEntry)
        console.log(savedJournalArray);

        localStorage.setItem("journals", JSON.stringify(savedJournalArray));
    } else {
        alert("Please enter a valid journal entry.")
    };
});

// Adds local storage journal history to page
function renderHistory() {
    var journalArray = JSON.parse(localStorage.getItem("journals"));
    console.log(journalArray);

    for (i = 0; i < journalArray.length; i++) {
        var addJournalEl = document.createElement("li");
        addJournalEl.textContent = journalArray[i];
        previousJournalsEl.appendChild(addJournalEl);
    }
};

renderHistory();