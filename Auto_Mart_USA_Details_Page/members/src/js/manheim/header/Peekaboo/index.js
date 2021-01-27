var prevScrollY;
var throttling;

var NS = 'uhf-';
var CLASS_SCROLL_DOWN = NS + 'scrolling--down';
var CLASS_SCROLL_UP = NS + 'scrolling--up';

var Peekaboo = {

  MINIMUM_THRESHOLD: 50,

  init: function (config) {

    if (!window) { return; }
    prevScrollY = window.scrollY;
    this.bindUI();
  },

  bindUI: function () {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  },

  handleScroll: function (e) {
    if (!throttling) {
      requestAnimationFrame(() => {
        this.updateUI();
        throttling = false;
      });

      throttling = true;
    }
  },

  updateUI: function() {
    var curScrollY = window.scrollY;

    if (Math.abs(curScrollY - prevScrollY) < this.MINIMUM_THRESHOLD) {
      return;
    }

    if (curScrollY < this.MINIMUM_THRESHOLD) {
      document.documentElement.classList.remove(CLASS_SCROLL_UP);
      document.documentElement.classList.remove(CLASS_SCROLL_DOWN);
    }
    else if (prevScrollY > curScrollY) { // page is moving down
      document.documentElement.classList.add(CLASS_SCROLL_DOWN);
      document.documentElement.classList.remove(CLASS_SCROLL_UP);
    }
    else if (prevScrollY < curScrollY) { // page is moving up
      document.documentElement.classList.add(CLASS_SCROLL_UP);
      document.documentElement.classList.remove(CLASS_SCROLL_DOWN);
    }

    prevScrollY = curScrollY;
  }
};

module.exports = Peekaboo;
