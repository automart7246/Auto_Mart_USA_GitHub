//Client-side authentication check only for contact guid and bearer tokencookies
if (HFS.ManualAuth && HFS.ManualAuth.contactGuid && HFS.ManualAuth.bearerToken) {
  
    if(window.location.href.indexOf('landingPage') != -1){
      document.getElementById("returnloginId").style.display = "";
    }else{
      document.getElementById("returnloginId").style.display = "none";
    }

    function getAccountInfo() {
      var xhrAccountInfo = new XMLHttpRequest();
      xhrAccountInfo.open("GET", "https://members.manheim.com/" + "gateway/account.json");
      xhrAccountInfo.withCredentials = 'true';
    /*  xhrAccountInfo.setRequestHeader("Content-Type", "application/json");
      xhrAccountInfo.setRequestHeader("Accept", "application/json");
      xhrAccountInfo.setRequestHeader("Access-Control-Allow-Origin", "*"); */
      xhrAccountInfo.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          //Request is finished, do processing here
          XMLHttpRequest.responseType = "json";
          var json = JSON.parse(this.responseText);
          if (document.getElementById("injectfivemil") && document.getElementById("injectacctname")) {
            document.getElementById("injectacctname").innerHTML = json.accountName;
            document.getElementById("injectfivemil").innerHTML = json.accountNumber;
          }
        }
      }
      xhrAccountInfo.send();
    }

    var contactGuid = HFS.ManualAuth.contactGuid;

    //Top makes variable with dynamic contactguid
    var vehicleMakeCount = {
      "data": "{\"query\":\"query{ getVehicleCounts( contactGuid :\\\"" + contactGuid + "\\\") { facets{ makes{ id  name count } }  } }\"}",
      "url": "https://link-middleware-prod.awsmdotcom.manheim.com/graphql"
    }
    //Top Types variable with dynamic contactguid
    var vehicleTypeCount = {
      "data": "{\"query\":\"query { getCountsByVehicleType ( contactGuid :\\\"" + contactGuid + "\\\") { facets{ vehicleSubTypes {  name  count } }   }  } \"}",
      "url": "https://link-middleware-prod.awsmdotcom.manheim.com/graphql"
    }

  } else {
    //Top makes variable defaults to use admin search
    var vehicleMakeCount = {
      "data": "{\"query\":\"query{ getVehicleCounts{ facets{ makes{ id  name count } }  } }\"}",
      "url": "https://link-middleware-prod.awsmdotcom.manheim.com/graphql"
    }
    //top types variable defaults to use admin search
    var vehicleTypeCount = {
      "data": "{\"query\":\"query { getCountsByVehicleType{ facets{  vehicleSubTypes {  name  count  }  }   }  } \"}",
      "url": "https://link-middleware-prod.awsmdotcom.manheim.com/graphql",
    }

  }

  var getVehicleCountsAjax = function () {
    var bearertoken = HFS.ManualAuth.bearerToken;
    // calling Top Types
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", vehicleTypeCount.url, true);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.setRequestHeader("Accept", "application/json");
    xhr2.setRequestHeader("bearertoken", bearertoken);
    xhr2.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        //Request is finished, do processing here
        XMLHttpRequest.responseType = "json";
        var json = JSON.parse(this.responseText);
        var p = json.data.getCountsByVehicleType.facets.vehicleSubTypes;
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
            if (document.getElementById(p[key].name)) {
              document.getElementById(p[key].name).innerHTML = p[key].name + " (" + p[key].count + ")";
            }
          }
        }
      }
    }
    xhr2.send(vehicleTypeCount.data);
    // calling Top Makes
    var xhr = new XMLHttpRequest();
    xhr.open("POST", vehicleMakeCount.url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("bearertoken", HFS.ManualAuth.bearerToken);
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        //Request is finished, do processing here
        XMLHttpRequest.responseType = "json";
        var json = JSON.parse(this.responseText);
        var p = json.data.getVehicleCounts.facets.makes;
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
            if (document.getElementById(p[key].name)) {
              document.getElementById(p[key].name).innerHTML = p[key].name + " (" + p[key].count + ")";
              var valueStr = document.getElementById(p[key].name + p[key].name).href;
              if (valueStr != null) {
                if (valueStr.length == valueStr.lastIndexOf(":") + 1) {
                  document.getElementById(p[key].name + p[key].name).href = document.getElementById(p[key].name + p[key].name).href + p[key].id;
                }
              }
            }
          }
        }
      }
    }
    xhr.send(vehicleMakeCount.data);
  };