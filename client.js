// URL for the JSON file.  Normally it comes from the line below, but due to http/https issues I saved a local copy.
// var url = 'http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2016-17&TeamID=1610612744';

// When the button is clicked, run a callback function
$('#quote').click(function() {
  var teamID = document.getElementById('teamInput').value;
  var url = 'https://jeffbautista.github.io/choose-team-get-weight/' + teamID + '.JSON';
  $.getJSON (url, function(data) {
    var playerData = data['resultSets'][0]['rowSet'];    
    // Use playerData.forEach() to find the combined player weight
    var total = 0;
    playerData.forEach(function(a) {
      total+= Number(a[7]);
    });
    
    // Iterate through playerData array and build a string
    var playerString = '<ol>';
    for (i=0; i<playerData.length; i++) {
      playerString+= '<li>' + playerData[i][3] + ': ' + playerData[i][7] + ' pounds.</li>';
    }
    playerString+= '</ol>';
    
    // Find the Team Name
    var url2 = 'https://jeffbautista.github.io/choose-team-get-weight/' + teamID + 'B.JSON';
    $.getJSON (url2, function(data2) {
       var teamName = data2['resultSets'][0]['rowSet'][0][2];
       var teamCity = data2['resultSets'][0]['rowSet'][0][4];
       
       // Display the total weight in the paragraph above the Player List <ol>
       var intro = document.getElementById('intro');
       intro.innerHTML = "Combined weight of all " + teamCity + " " + teamName + " players:  " + total + " pounds.";
    });
 
    
    var playerListOL = document.getElementById('text-block');
    playerListOL.innerHTML = playerString;
      
  });

});
