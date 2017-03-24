var users = ["ESL_SC2","OgamingSC2", "freecodecamp", "brunofin", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

var status = "";
users.forEach(function(user){
  var myLink = "https://wind-bow.gomix.me/twitch-api/streams/" + user + "/?callback=?";
  $.getJSON(myLink, function(json){
      console.log(json)
      if (json.stream === null) {
        status = "offline";
        myLink = "https://wind-bow.gomix.me/twitch-api/channels/" + user + "/?callback=?";
        $.getJSON(myLink, function(json) {
          if (json.url) {
            $(".results").append("<div class='row offlineDiv'><div class='col-sm-6'><img class='imgLogo' src=\"" + json.logo + "\"/>" + " " + "<span class='dispName'>" + "<a href=\'"+ json.url+ "\' target='_blank'>" + json.display_name + "</a>" + "</span></div>" + " " +"<div class='col-sm-6'>" + status + "</div></div>");
          } else {
            $(".results").append("<div class='row errorDiv'><div class='col-sm-6'>" + json.message + "</div>" + " " +"<div class='col-sm-6'></div></div>");
          }
        });
      } else {
          if (json.stream === 'undefined') {
            status = "closed";
          } else {
              $(".results").append("<div class='row onlineDiv'><div class='col-sm-6'><img class='imgLogo' src=\"" + json.stream.channel.logo + "\"/>" + " " + "<span class='dispName'>" + "<a href=\'"+ json.stream.channel.url+ "\' target='_blank'>" + json.stream.channel.display_name + "</a>" + "</span></div>" + " " +"<div class='col-sm-6'>" + json.stream.channel.status + "</div></div>");
              status = "online";
            }
      }

  });
});

$("#radioOnline").on("click", setOnline);
$("#radioOffline").on("click", setOffline);
$("#radioAll").on("click", setAll);

function setOnline() {
  $(".offlineDiv").css("display", "none");
  $(".errorDiv").css("display", "none");
  $(".onlineDiv").css("display", "block");
};
function setOffline() {
  $(".onlineDiv").css("display", "none");
  $(".errorDiv").css("display", "none");
  $(".offlineDiv").css("display", "block");
};
function setAll() {
  $(".onlineDiv").css("display", "block");
  $(".offlineDiv").css("display", "block");
  $(".errorDiv").css("display", "block");
};
