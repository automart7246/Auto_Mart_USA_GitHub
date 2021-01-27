(function () {
    HFS.Guava.init();
    HFS.Guava.reset();
    HFS.Peekaboo.init();


    // removing basic search from srp and vdp views temporarily until strike can fix a bug preventing the form from being on the same pages as the SRP or VDP
    var renderBasicSearchWidget = true;
    if((window.location.href.indexOf('members/results#/') !== -1) || (window.location.href.indexOf('results#/details') !== -1)){
      renderBasicSearchWidget = false;

      var searchFormToggle = document.getElementById("basic_search");
      var searchFormOverlay = document.getElementById("basic_search_overlay");
      if (searchFormToggle) {
        searchFormToggle.style.visibility = "hidden";
      }
      if (searchFormOverlay) {
        searchFormOverlay.style.visibility = "hidden";
      }
    }

    if (HFS.ManualAuth) {
        HFS.ManualAuth.init();
      if (HFS.ManualAuth.contactGuid && HFS.ManualAuth.bearerToken && HFS.ManualAuth.authTkt) {


        HFS.GreetUser.init();

        var globalUrls = {
          results: "file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/Auto_Mart_USA_Landing_Page/members/results.html",
          advancedSearch: "file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/Auto_Mart_USA_AdvancedSearch_Page/advancedSearch.html",
          basicSearch: "",
          login: "file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/Auto_Mart_USA_Landing_Page/members/gateway/logout",
          workbook: "#",
          allSavedSearches: "file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/Auto_Mart_USA_Landing_Page/members/savedSearch",
          workbookHost: "file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/"
        };


        if(showSearch) {
          var myVar = setInterval(function(){ myTimer() }, 1000);
          var counter = 0;
          function myTimer() {
             if(typeof oneSearch !== 'undefined' ) {
             clearInterval(myVar);
             HFS.TriggerOneSearch.init(env, HFS.ManualAuth.userToken, globalUrls, renderBasicSearchWidget);
          }
            counter++;

            if(counter > 5) {

               clearInterval(myVar);
            }
         }
       }
      } else {
        console.log("you do not have all cookies present to be authenticated");
      }
    }
  }());
  function getCookieValue(cookieName) {
  //  console.log("Main cookie value");
    var cookieValue = null;

    if (document.cookie.length > 0) {
       //console.log("inside get Cookie value:", document.cookie);
      var startIndex = document.cookie.indexOf(cookieName + '=');

      if (startIndex != -1) {
        startIndex = startIndex + cookieName.length + 1;
        var endIndex = document.cookie.indexOf(';', startIndex);

        if (endIndex == -1) {
          endIndex = document.cookie.length;
        }

        cookieValue = document.cookie.substring(startIndex, endIndex);
      }
    }

    return cookieValue;
  }

  if(getCookieValue("beta_indicator") == null){
    document.getElementById("returnloginId").style.display = "none";
  }else{
    if(window.location.href.indexOf('landingPage') != -1){
      document.getElementById("returnloginId").style.display = "";

      /* history.pushState(null, null, location.href);
      window.onpopstate = function () {
        history.go(1);
      }; */
    }else{
      document.getElementById("returnloginId").style.display = "none";
    }
  }
  function baseDomainString(){
        e = document.domain.split(/\./);
        if(e.length > 1) {
              return(e[e.length-2] + "." +  e[e.length-1]);
        } else {
              return(document.domain);
        }
  }
function openuseriq(nextPage){

    window._uiq_activateCampaign(32822);
    var myVar = setInterval(function(){ myTimer(nextPage) }, 1000);
    var counter = 0;
    function myTimer(nextPage) {
      if(window.document.getElementById('_uiq_ft') == null ) {
         clearInterval(myVar);
         updateBetaCookie(nextPage);
         document.querySelector('.loadingOldManheim').classList.remove("hide");
      }
        counter++;
      //   console.log("Tried " + counter + " time ");
        if(counter > 100) {
          //console.log("Tried 5 times giving up ");
           clearInterval(myVar);
        }
    }
}
function updateBetaCookie(nextPage){
//  console.log("updateBetaCookie" + nextPage);

  var userid = HFS.ManualAuth.userToken.userId;
//  console.log("userid:" + userid);
  var xhrUpdateBeta = new XMLHttpRequest();
  xhrUpdateBeta.open("GET", "https://members.manheim.com/" + "gateway/toggleupdate.json?" + "user=" + userid + "&togglestatus=CLASSIC&contactguid=" + getCookieValue("contactguid") );
  xhrUpdateBeta.withCredentials = 'true';
//  xhrUpdateBeta.setRequestHeader("contact_guid", getCookieValue("contactguid"));

  xhrUpdateBeta.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      //  console.log("cookie should have updated by now");

      //  webData.events.push("return to Login");
        location.href = nextPage;
        return true;
    }
  }
  xhrUpdateBeta.send();

}
  /*
  * Only set document.domain for AuctionGenius users.
  */
  var aguser = getCookieValue("ag_user");
  if (aguser !== null && aguser !== "") {
      document.domain = baseDomainString();
  }
