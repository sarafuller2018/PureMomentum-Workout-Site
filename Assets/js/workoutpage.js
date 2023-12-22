// API code for getting workouts information
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=abdominals',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '837bd24d63mshff4c202742d0dbfp14a012jsn2368043f393c',
		'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});


var muscle = 'biceps'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: { 'X-Api-Key': 'YOUR_API_KEY'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});