import 'whatwg-fetch'

var LOG = (msg) => {
  return;

};

/**
 * Retrieve the client location and send to remote translator. Then update UI
 *   with current location information or messaging.
 */
var LocationInfo = {

  /**
   * Initialize with provided config. Then proceed to update the UI.
   * @param {Object} config
   * @param {Node} congif.node
   * @param {String} congif.url
   */
  init: function (config) {
  //  console.log('LocationInfo::init', config);

    if (!config || !config.node || !config.url) {
      console.error('Could not establish location.');
      return;
    }

    this.node = config.node;
    this.url = config.url;
    this.locationsBaseUrl = config.locationsBaseUrl;
    this.nearByNode = config.nearByNode;
    this.eventsNode = config.eventsNode;
    this.directionsNode = config.directionsNode;

    if (navigator && navigator.geolocation) {
      this.fetchLocation();
    } else {
      this.updateUI('Geolocation is not supported by this browser.');
    }
  },

  /**
   * Obtain geolocation from client and update position when permitted.
   *   Otherwise, show error.
   * @method fetchLocation
   * @see updatePosition
   * @see updateError
   */
  fetchLocation: function () {
    LOG('LocationInfo::fetchLocation');
      if(this.getCookie("longitude") === ""){
        navigator.geolocation.getCurrentPosition(
            this.updatePosition.bind(this),
            this.updateError.bind(this)
          );
      }else{
        const data = {
          latitude: this.getCookie("latitude"),
          longitude: this.getCookie("longitude")
        };
        if(data.latitude !== "denied")
          this.updatePostionWithoutAsk(data);
      }
  },

  setCookie: function(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let domainVar = window.location.hostname;
    let expires = "expires="+ d.toUTCString();

    try{
      if(domainVar.indexOf(".")){
          let parsedDomain = domainVar.substring(domainVar.indexOf(".") , domainVar.length);
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";domain=" + parsedDomain + ";secure";
      }else{
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    }catch (err){
       document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  },

  getCookie: function(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  /**
   * When the fetch is successful, updates ui with data address.
   * @param {Object} data
   */
  handleFetchSuccess: function (position, data) {
    LOG('LocationInfo::handleFetchSuccess');
    this.updateUI(data.name + " <br>" + data.address + " <br>" + data.state + " <br>" + data.zip + " <br>" + data.country +  " <br>" + data.primaryPhone);
    this.updateNearBy(position, data);
  },
  handleFetchSuccessNoAsk: function (pos,data) {
    LOG('LocationInfo::handleFetchSuccess');
  
    this.updateUI(data.name + " <br>" + data.address + " <br>" + data.state + " <br>" + data.zip + " <br>" + data.country +  " <br>" + data.primaryPhone);
    this.updateNearByNoAsk(data);
  },

  /**
   * When the fetch fails, updates ui with error message.
   * @param {Object} err
   */
  handleFetchError: function (err) {
    LOG('LocationInfo::handleFetchError');
    console.log(err); // In case of error default atlanta address will be displayed
  //  this.updateUI(err);
  },

  /**
   * Updates UI with supplied content.
   * @param {String | HTMLString} contents
   */
  updateUI: function (content) {
    LOG('LocationInfo::updateUI');
    this.node.innerHTML = content;
  },

  /**
   * Updates the url of the near by events and inventory with a url based on location.
   * @param {String} locationCode
   */
  updateNearBy: function (position, data) {

    var posLat = position.coords.latitude;
    var posLon = position.coords.longitude;

    var code = data.locationCode;
    var dataLat = data.latitude;
    var dataLon = data.longitude;

    if(this.eventsNode){
      this.eventsNode.href = `${this.locationsBaseUrl}/locations/${code}/events`;
    }
    if(this.directionsNode){
      this.directionsNode.href =  `${this.locationsBaseUrl}/home/directions?origin_lat=${posLat}&origin_long=${posLon}&dest_lat=${dataLat}&dest_long=${dataLon}`;
    }
    if(this.nearByNode) {
      this.nearByNode.href = `${this.locationsBaseUrl}/home/maps?latitude=${posLat}&longitude=${posLon}`;
    }
  },
  updateNearByNoAsk: function ( data) {

    var posLat = this.getCookie("latitude");
    var posLon = this.getCookie("longitude");

    var code = data.locationCode;
    var dataLat = data.latitude;
    var dataLon = data.longitude;

    if(this.eventsNode){
      this.eventsNode.href = `${this.locationsBaseUrl}/locations/${code}/events`;
    }
    if(this.directionsNode){
      this.directionsNode.href =  `${this.locationsBaseUrl}/home/directions?origin_lat=${posLat}&origin_long=${posLon}&dest_lat=${dataLat}&dest_long=${dataLon}`;
    }
    if(this.nearByNode) {
      this.nearByNode.href = `${this.locationsBaseUrl}/home/maps?latitude=${posLat}&longitude=${posLon}`;
    }
  },
  /**
   * Receives the client position and post data to the configuration URL. Then
   *   translates response to an object and sends to `handleFetchSuccess`. If
   *   there is an error, then we send the error message `handleFetchError`.
   * @param {Object} position
   * @see handleFetchSuccess
   * @see handleFetchError
   */
  updatePosition: function (position) {
    LOG('LocationInfo::updatePosition');
    const data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    if (!window || !window.fetch) {
      return;
    }
    this.setCookie("longitude", data.longitude, 100);
    this.setCookie("latitude", data.latitude, 100);
    window.fetch(this.url + "?latitude=" + data.latitude + "&longitude=" + data.longitude , {
        method: 'GET',
        credentials: 'include',

      })
      .then(response => response.json())
      .then(this.handleFetchSuccess.bind(this, position))
      .catch(this.handleFetchError.bind(this));
  },
  updatePostionWithoutAsk: function(data){
    window.fetch(this.url + "?latitude=" + data.latitude + "&longitude=" + data.longitude , {
        method: 'GET',
        credentials: 'include',

      })
      .then(response => response.json())
      .then(this.handleFetchSuccessNoAsk.bind(this,data))
      .catch(this.handleFetchError.bind(this));
  },
  /**
   * Receives an error from the client's geolocation lookup. Then calls
   *   `updateUI` with an appropriate string based on the error.
   * @param {Object} error
   * @see updateUI
   */
  updateError: function (error) {
    LOG('LocationInfo::updateError');
     this.setCookie("latitude", "denied", 100);
     this.setCookie("longitude", "denied", 100);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.updateUI('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        this.updateUI('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        this.updateUI('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        this.updateUI('An unknown error occurred.');
        break;
    }
  },
};


module.exports = LocationInfo;
