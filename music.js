// Put your Last.fm API key here
var api_key = "";

var request = new XMLHttpRequest();
var requestEvents = new XMLHttpRequest();
var requestAlbums = new XMLHttpRequest();

function displayResult () {
	if (request.readyState == 4 && requestEvents.readyState == 4 && requestAlbums.readyState == 4) {
        var json = JSON.parse(request.responseText);
        var jsonEvents = JSON.parse(requestEvents.responseText);
        var jsonAlbums = JSON.parse(requestAlbums.responseText);

        var str = JSON.stringify(json,undefined,2);
        document.getElementById("output").innerHTML ="<h3>Artist Name :</h3>" + json.artist.name + "<h3>Artist Bio :</h3>" + json.artist.bio.summary;
	var img;
	
	for(img in json.artist.image){        
		if(json.artist.image[img].size=="medium")
		{                                
			var artistImg="<img src='"+json.artist.image[img]['#text']+"' />";
			document.getElementById("artistImage").innerHTML += artistImg;
		}
   	}


        //for events
        var strEvents = JSON.stringify(jsonEvents,undefined,2);
        var eventList = new Array();
        var evt = 0;
        while(evt < jsonEvents.events.event.length)
        {
                eventURL = JSON.stringify(jsonEvents.events.event[evt].url,undefined,2);
                eventTitle = JSON.stringify(jsonEvents.events.event[evt].title,undefined,2);
                eventList[eventURL] = eventTitle;
                evt++;
        }
        for(var url in eventList)
        {
                document.getElementById("outputEvents").innerHTML +="<a href='+url+'>"+eventList[url]+"</a><br/>";
        }

        //for Albums
        var strAlbums = JSON.stringify(jsonAlbums,undefined,2);

	
        var alb = 0;
        while(alb < jsonAlbums.topalbums.album.length)
        {
                document.getElementById("outputAlbums").innerHTML += jsonAlbums.topalbums.album[alb].name;
                alb++;
        }

}
}
function sendRequest () {
var method = "artist.getinfo";
    var methodEvents = "artist.getEvents";
    var methodAlbums = "artist.getAlbums";

    request.onreadystatechange = displayResult;
    requestEvents.onreadystatechange = displayResult;
    requestAlbums.onreadystatechange = displayResult;

    var artist = document.getElementById("form-input").value;

    request.open("GET","proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    requestAlbums.open("GET","proxy.php?method="+methodAlbums+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    requestEvents.open("GET","proxy.php?method="+methodEvents+"&artist="+artist+"&api_key="+api_key+"&format=json",true);

    request.withCredentials = "true";
    requestEvents.withCredentials = "true";
    requestAlbums.withCredentials = "true";
    request.send(null);
    requestEvents.send(null);
    requestAlbums.send(null);

}
