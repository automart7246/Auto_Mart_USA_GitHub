var NS = "uhf-";
var OVERFLOW_HIDE = NS + "overflow--hidden";
var ACTIVE_TRIGGER = NS + 'active-trigger';
var panels;

var Accordion = {

  init: function () {
    var footerContainer = this.footerContainer = document.getElementById("footer--container");
    this.triggers = footerContainer.querySelectorAll("[class*=accordion__trigger]");
    this.currentTrigger = null;
    this.previousPanel = null;

    this.bindUI();
  },

  bindUI: function () {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    this.bindTriggers();
  },

  bindTriggers: function () {
    var triggers = this.triggers;
    var i = 0;
    var len = triggers.length;

    for (i = 0, len = triggers.length; i < len; i++) {
      triggers[i].addEventListener("click", this.handleAccordionTriggerClick.bind(this));
    }
  },

  handleWindowResize: function (e) {
    var radios = this.footerContainer.querySelectorAll('input[type="radio"]');
    var i = 0;
    var len = radios.length;

    for (; i < len; i++) {
      radios[i].checked = false;
    }

    var active = this.footerContainer.querySelector('.' + ACTIVE_TRIGGER);

    if (active) {
      active.classList.remove(ACTIVE_TRIGGER);
    }

    if (this.currentTrigger) {
      this.deactivateTrigger();
    }

    if (panels) {
      for (i = 0, len = panels.length; i < len; i++) {
        panels[i].setAttribute('style', null);
      }
    }
  },

  handleAccordionTriggerClick: function (e) {
    var label = e.target;
    var previousPanel = this.previousPanel;

    while (label && label.tagName !== 'LABEL') {
      label = label.parentNode;
    }

    if (!label) { // EXIT
      return;
    }

    var radio = document.getElementById(label.getAttribute('for'));
    panels = radio.parentNode.querySelectorAll(".uhf-accordion__panel");
    var panel = panels[panels.length - 1];

    if (!radio) {
      // exit
      return;
    }

    if (radio.checked) {
      e.preventDefault();
      radio.checked = false;
      panel.style.height = 0;
      previousPanel = null;
    }
    else {
      radio.checked = true;

      if (previousPanel) {
        previousPanel.style.height = 0;
      }

      setTimeout(() => {
        panel.style.height = panel.scrollHeight + "px";
      }, 10);

      setTimeout(() => {
        panel.style.height = "auto";
      }, 300);

      this.previousPanel = panel;
    }
  },

  activateTrigger: function (triggerNode) {
    if (triggerNode.classList.contains(NS + "menu__trigger")) {
      document.body.classList.add(OVERFLOW_HIDE);
    }
    if (triggerNode.dataset.trigger) {
      footerContainer.classList.toggle(
        "${ACTIVE_TRIGGER}--${triggerNode.dataset.trigger}"
      );
    } else {
      triggerNode.parentNode.classList.toggle(ACTIVE_TRIGGER);
    }

    this.currentTrigger = triggerNode;
  },

  deactivateTrigger: function (triggerNode) {
    triggerNode = triggerNode || this.currentTrigger;

    if (!triggerNode) {
      return;
    }

    if (triggerNode.classList.contains(NS + "menu__trigger")) {
      document.body.classList.remove(OVERFLOW_HIDE);
    }

    if (triggerNode.dataset.trigger) {
      footerContainer.classList.remove(
        "${ACTIVE_TRIGGER}--${triggerNode.dataset.trigger}"
      );
    }
    else {
      triggerNode.parentNode.classList.remove(ACTIVE_TRIGGER);
    }
  }
};

module.exports = Accordion;
