var ManualAuth = {

    init: function () {
        var authTkt = this.authTkt = this.getCookieValue('auth_tkt');
        var contactGuid = this.contactGuid = this.getCookieValue('contactguid');
        var bearerToken = this.bearerToken = this.getCookieValue('bearerToken');
        // console.log('** ManualAuth: authTkt', authTkt);
        // console.log('** ManualAuth: contact guid', contactGuid);
        // console.log('** ManualAuth: bearer token', bearerToken);

        if (authTkt && contactGuid && bearerToken) {
            document.querySelector("html").classList.add("authenticated");
            this.userToken = this.createUserTokenObj(authTkt, contactGuid, bearerToken);
            // console.log("All 3 cookies present, user token:", this.userToken);
            let elArr = document.getElementsByClassName('uhf-user__fname');
            if (elArr.length) {
                for (let i = 0; i < elArr.length; i++) {
                    elArr[i].innerHTML = this.userToken.userFirstName;
                }
            }
            if(document.getElementById("accountAlertsComponent")){
                document.getElementById("accountAlertsComponent").setAttribute("data-param", this.userToken.userId);
            }
        } else {
            document.querySelector("html").classList.remove("authenticated");
            console.log("The three cookies required to authenticated the header are NOT present.");
        }
    },

    getCookieValue: function (cookieName) {
        var cookieValue = null;
        if (document.cookie.length > 0) {
            // console.log("inside get Cookie value:", document.cookie);
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
    },

    createUserTokenObj: function (at, cg, bt) {

        if (at.startsWith("\"")) {
            at = at.substring(1, at.length - 1);
        }
        at = decodeURIComponent(at);
        var decToken = at;
        if (this.isBase64(at)) {
            // console.log("inside isBase64 check: slashes should be gonezo:" + at);
            var originalBase64Auth = at;
            decToken = window.atob(at);
        } else {
            //try to add padding and see if it is base64 or not
            var orginalVar  = at;
            var str_at  = at + Array((4 - at.length % 4) % 4 + 1).join('=');
              
            if(this.isBase64(str_at))
            {
              var originalBase64Auth = str_at;
              decToken = window.atob(str_at);

            }else{

              originalBase64Auth = window.btoa(orginalVar);
           }
        }
        // splitting authtkt and getting userid	 			// splitting authtkt and getting userid
 			    decToken = decodeURIComponent(decToken);
        var unique = decToken.substring(0, 40);
        var tokenBits = decToken.substring(40).split('!');

        var token = {
            contactGuid: cg,
            originalToken: originalBase64Auth,
            bearerToken: bt,
            token: unique,
            userId: 'Guest',
            userFullName: 'Guest',
            userFirstName: 'None',
            meta: ''
        };

        if (tokenBits.length > 1) {
            var userfullname = this.getUsername(tokenBits);
            token = {
                contactGuid: cg,
                originalToken: originalBase64Auth, // onesearch component requires base64
                bearerToken: bt,
                token: unique,
                userId: tokenBits.shift(),
                userFullName: userfullname,
                userFirstName: userfullname.split(' ')[0],
                meta: tokenBits.join(', ')
            };
        } else {
            // not enough info, continue as guest, reset set token object to empty
            token = {};
        }
        return token;
    },

    isBase64: function (str) {
        try {
            return window.btoa(window.atob(str)) == str;
        } catch (err) {
          //  console.log(err);
            return false;
        }
    },

    getUsername: function (tb) { //pass the token bits as a parameter, abbrv name to avoid confusion with other variables
        var username = tb.pop().replace('+', ' ')
        if (username.indexOf('|') > 0) {
            username = username.substring(0, username.indexOf('|'))
            username = this.jsUsfirst(username);
        }
        return decodeURIComponent(username);
    },

    jsUsfirst: function (un) { // pass the username as a paramater, abbrv name to avoid confusion with other variables
        try {
            un = un.toLowerCase();
            var result = un.split(' ');
            var convertedUsername = "";
            for (var i = 0; i < result.length; i++) {
                convertedUsername += sliceIt(result[i]) + " ";
            }
            return convertedUsername.trim();
        } catch (err) {
            return un;
        }
    }

};

module.exports = ManualAuth;
