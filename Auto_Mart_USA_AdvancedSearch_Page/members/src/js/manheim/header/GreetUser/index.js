var GreetUser = {

    init: function () {
        var usergreetingelement = document.querySelectorAll(".uhf-user__greeting");
        // console.log('greet user init:', this.greeting);
        if (usergreetingelement.length) {
            for (let i = 0; i < usergreetingelement.length; i++) {
                usergreetingelement[i].innerHTML = this.greetUser();
            }
        }
    },

    greetUser: function () {
        var currentHour = new Date().getHours();
        // console.log('this is the current hour:', currentHour);
        this.greeting = '';
        if (currentHour >= 0 && currentHour < 12) {
          this.greeting = "Good morning"
        } else if (currentHour >= 12 && currentHour < 18) {
          this.greeting = "Good afternoon"
        } else {
          this.greeting = "Good evening"
        }
        // console.log('greet user returns:', this.greeting);
        return this.greeting;
    }

};

module.exports = GreetUser;
