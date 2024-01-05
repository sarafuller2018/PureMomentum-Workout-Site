var journalEntryEl = document.getElementById("journalEntry");
var journalEntrySubmitButtonEl = document.getElementById("submitJournalButton");
var currentJournalEl = document.getElementById("currentJournal");
var previousJournalsEl = document.getElementById("previousJournals");
var savedJournalArray = [];

if (JSON.parse(localStorage.getItem("journals")) !== null) {
    savedJournalArray = JSON.parse(localStorage.getItem("journals"));
};

journalEntrySubmitButtonEl.addEventListener("click", function () {

    var journalEntry = journalEntryEl.value;
    console.log(journalEntry);

    var addCurrentJournalEl = document.createElement("p");
    addCurrentJournalEl.textContent = journalEntry;
    currentJournalEl.appendChild(addCurrentJournalEl);

    savedJournalArray.unshift(journalEntry)
    console.log(savedJournalArray);

    localStorage.setItem("journals", JSON.stringify(savedJournalArray));
});

function renderHistory() {
    var journalArray = JSON.parse(localStorage.getItem("journals"));
    console.log(journalArray);

    for (i=0; i<journalArray.length; i++) {
        var addJournalEl = document.createElement("p");
        addJournalEl.textContent = journalArray[i];
        previousJournalsEl.appendChild(addJournalEl);
    }
};

renderHistory();