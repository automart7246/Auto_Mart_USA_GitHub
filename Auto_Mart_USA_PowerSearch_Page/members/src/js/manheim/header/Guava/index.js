var NS = "uhf-";
var OVERFLOW_HIDE = NS + "overflow--hidden";
var ACTIVE_TRIGGER = NS + 'active-trigger';
var SHOW_MORE = NS + 'menu__category--show-more';

var panels;

/**
 * UHF 2.0 JS package
 */
var Guava = {

  /**
   * Keeps track of the current accordion which is active
   * @property currentTrigger
   */
  currentTrigger: null,

  /**
   * Keeps track of the current accordion panel being displayed
   * @property previousPanel
   */
  previousPanel: null,

  /**
   * Minimized lookup target for the header container
   * @property headerContainer
   */
  headerContainer: null,

  /**
   * Lookup target for all items that relate to the offscreen menu
   * @property menuOffscreen
   */
  menuOffscreen: null,

  /**
   * All triggers except accordion triggers
   * @property triggers
   */
  triggers: null,

  /**
   * All accordion specific triggers
   * @property accordionTriggers
   */
  accordionTriggers: null,

  /**
   * All accordion closers
   * @property accordionClosers
   */
  accordionClosers: null,

  /**
   * Element responsible for removing active triggers, but keeping the view the
   *   same otherwise.
   * @property removeTrigger
   */
  removeTrigger: null,

  /**
   * Element responsible for closing active triggers and resetting the view
   * @property closeTrigger
   */
  closeTrigger: null,

  /**
   * Initializes lookup targets and triggers `bindUI`
   * @method init
   * @see bindUI
   */
  init: function(){
    var headerContainer = this.headerContainer = document.getElementById(`${NS}header--container`);
    this.menuOffscreen = headerContainer.querySelectorAll(`.${NS}menu--offscreen`);
    var triggers = headerContainer.querySelectorAll("[class*=__trigger]:not([class*=accordion__trigger])");
    this.triggers = Array.prototype.slice.call(triggers);
    this.accordionTriggers = headerContainer.querySelectorAll("[class*=accordion__trigger]");
    this.accordionClosers = headerContainer.querySelectorAll(`.${NS}button--close, .${NS}menu__category__item a`);
    this.removeTrigger = headerContainer.querySelector(`.${NS}trigger__remove`);
    this.closeTrigger = headerContainer.querySelector(`.${NS}user__close`);
    this.showMoreTrigger = headerContainer.querySelectorAll(`.${NS}menu__category--has-more + .${NS}menu__category__item--view-more`)

    this.bindUI();
  },

  ///////
  // BIND

  /**
   * Responsible for binding or calling all bind methods
   * @method bindUI
   * @see bindUserAccountTrigger
   * @see bindTriggers
   * @see bindClosers
   */
  bindUI: function () {
    window.addEventListener('resize', this.handleResize.bind(this));

    this.bindUserAccountTrigger();
    this.bindTriggers();
    this.bindClosers();
    this.bindShowMore();
  },

  /**
   * Adds event listeners to various trigger click events.
   * @method bindTriggers
   */
  bindTriggers: function () {
    var triggers = this.triggers;
    var i = 0;
    var len = triggers.length;

    for (; i < len; i++) {
      triggers[i].addEventListener("click", this.handleTriggerClick.bind(triggers[i]));
    }

    var removeTrigger = this.removeTrigger;
    removeTrigger.addEventListener("click", this.handleremoveTriggerClick.bind(removeTrigger));
    this.closeTrigger.addEventListener("click", this.handleremoveTriggerClick.bind(removeTrigger));

    var accordionTriggers = this.accordionTriggers;

    for (i = 0, len = accordionTriggers.length; i < len; i++) {
      accordionTriggers[i].addEventListener("click", this.handleAccordionTriggerClick.bind(this));
    }
  },

  /**
   * Attaches click event listeners to all accordion closers
   * @method bindClosers
   */
  bindClosers: function () {
    var closers = this.accordionClosers;
    var i = 0;
    var len = closers.length;

    for (; i < len; i++) {
      closers[i].addEventListener("click", this.handleCloserClick.bind(this));
    }
  },

  /**
   * Creates a fake account trigger and attaches a click event listener for the
   *   panel
   * @method bindUserAccountTrigger
   */
  bindUserAccountTrigger: function () {
    var userAccountTrigger = document.querySelector(`.${NS}accordion__trigger .${NS}user__link`);

    var accountTrigger;
    var newLabel;

    // CREATE fake label
    if (userAccountTrigger) {
      accountTrigger = document.querySelector(`.${NS}accordion__trigger label`);
      newLabel = document.createElement("label");
      newLabel.setAttribute("for", accountTrigger.getAttribute("for"));
      userAccountTrigger.parentNode.insertBefore(newLabel, userAccountTrigger);
      newLabel.appendChild(userAccountTrigger);
      this.triggers[this.triggers.length] = newLabel;
      userAccountTrigger.addEventListener('click', (e) => { e.preventDefault(); })

    }
  },

  /**
   * Attaches the click event toggler to the show more triggers
   * @method bindShowMore
   */
  bindShowMore: function () {
    var triggers = this.showMoreTrigger;
    var i = 0;
    var len = triggers.length;
    for (; i < len; i++) {
      triggers[i].addEventListener('click', this.handleShowMoreClick.bind(this));
    }
  },

  /**
   * Activates the clickoutside listener
   * @method bindClickOutside
   * @see handleClickOutside
   */
  bindClickOutside: function () {
    window.addEventListener('click', this.handleClickOutside.bind(this));
  },

  /**
   * Deactivates the clickoutside listener
   * @method unbindClickOutside
   * @see handleClickOutside
   */
  unbindClickOutside: function () {
    window.removeEventListener('click', this.handleClickOutside.bind(this));
  },

  /**
   * Activates the trigger according to the bound element
   * @method handleTriggerClick
   * @param {MouseEvent} e
   * @see activateTrigger
   */
  handleTriggerClick: function (e) {
    e.preventDefault();
    Guava.activateTrigger(this);
  },

  /**
   * Deactivates the current trigger
   * @method handleremoveTriggerClick
   * @param {MouseEvent} e
   * @see deactivateTrigger
   */
  handleremoveTriggerClick: function (e) {
    e.preventDefault();
    Guava.deactivateTrigger();
  },

  /**
   * Calls reset
   * @method handleCloserClick
   * @param {MouseEvent} e
   * @see reset
   */
  handleCloserClick: function (e) {
    this.reset();
  },

  /**
   * Deactivates and resets all view activity upon resize
   * @method handleResize
   */
  handleResize: function() {
    var radios = this.headerContainer.querySelectorAll('input[type="radio"]');
    var i = 0;
    var len = radios.length;
    for (; i<len; i++) {
      radios[i].checked = false;
    }

    var active = this.headerContainer.querySelector('.' + ACTIVE_TRIGGER);
    if (active) {
      active.classList.remove(ACTIVE_TRIGGER);
    }

    if (Guava.currentTrigger) {
      Guava.deactivateTrigger();
    }

    if (panels){
      for (i = 0, len = panels.length; i<len; i++){
        panels[i].setAttribute('style', null);
      }
    }
  },

  /**
   * Toggles the show more class on the trigger container
   * @param {MouseEvent} e
   */
  handleShowMoreClick: function (e) {
    e.preventDefault();
    var button = e.currentTarget;
    var buttonText = button.querySelector('.prism-button__text');
    var controlList = button.previousSibling;

    while (controlList && controlList.previousSibling && controlList.tagName !== 'UL') {
      controlList = controlList.previousSibling;
    }

    if (!controlList) {
      console.error('Cannot find control list.');
      return;
    }

    if (controlList.classList.contains(SHOW_MORE)) {
      controlList.classList.remove(SHOW_MORE);
      buttonText.innerHTML = buttonText.innerHTML.replace('Less', 'More');
    }
    else {
      controlList.classList.add(SHOW_MORE);
      buttonText.innerHTML = buttonText.innerHTML.replace('More', 'Less');
    }

  },

  //////////
  // Accordion logic


  /**
   * Opens and closes accorion panels depending on current active and current
   *   clicked
   * @method handleAccordionTriggerClick
   * @param {MouseEvent} e
   */
  handleAccordionTriggerClick: function (e) {
    var promoContainer = document.getElementById("promoBannerComponent");
    var promoBannerLink = promoContainer.querySelectorAll(".promobanner__details--link");

    if(promoBannerLink !=null && promoBannerLink.length > 0 )
     promoBannerLink[0].addEventListener("click", this.handleCloserClick.bind(this));


    var label = e.target;
    while (label && label.tagName !== 'LABEL') {
      label = label.parentNode;
    }
    if (!label) { // EXIT
      return;
    }

    var radio = document.getElementById(label.getAttribute('for'));
    panels = radio.parentNode.querySelectorAll(`.${NS}accordion__panel`);
    var panel = panels[panels.length - 1];

    if (!radio) {
      // exit
      return;
    }

    if (radio.checked) {

      e.preventDefault();
      this.deactivatePanel(panel, radio);
    }
    else {

      e.preventDefault();
      e.stopImmediatePropagation();
      if(e.target.id === 'uhf---panelbutton--Buy'){
        getVehicleCountsAjax();
      }
      if(e.target.id === 'viewAccountid'){
       getAccountInfo();
     }
      this.activatePanel(panel, radio);
    }
  },

  /**
   * Turns on the requested panel and activates the click outside listener
   * @method activatePanel
   * @param {Node} panel
   * @param {Node} radio
   * @see bindClickOutside
   */
  activatePanel: function (panel, radio){

    radio.checked = true;

    if (this.previousPanel) {
      this.previousPanel.style.height = 0;
    }

    setTimeout(() => {
      panel.style.height = panel.scrollHeight + "px";
    }, 10);

    setTimeout(() => {
      panel.style.height = "auto";
    }, 300);

    this.previousPanel = panel;

    setTimeout(() => {
      this.bindClickOutside();
    }, 10);



  },

  /**
   * Closes the panel provided or the current active panel if not provided
   * @param {Node} _panel
   * @param {Node} radio
   */
  deactivatePanel: function (_panel, radio) {
    var panel = _panel || this.previousPanel;

    if (!panel) {
      return;
    }

    if (!radio) {
      radio = panel.parentNode.querySelector(`input[type="radio"].${NS}accordion__active`);
    }

    if (radio) {
      radio.checked = false;
    }

    panel.style.height = 0;
    var viewAccountTrigger = document.querySelectorAll(".uhf-active-trigger");
    [].forEach.call(viewAccountTrigger, function(el) {
        el.classList.remove("uhf-active-trigger");
    });

    this.previousPanel = null;
    this.unbindClickOutside();
  },

  /**
   * Activates the provided trigger setting it as the current trigger.
   * @param {Node} triggerNode
   */
  activateTrigger: function(triggerNode) {
    this.currentTrigger = triggerNode;

    if (!triggerNode) { return; } // exit

    var triggerData = triggerNode.dataset ? triggerNode.dataset.trigger : triggerNode.getAttribute('data-trigger');

    if (triggerData === 'menu') {
      this.openSideMenu(triggerNode);
      return;
    }

    if (triggerData) {
      this.headerContainer.classList.toggle(
        `${ACTIVE_TRIGGER}--${triggerData}`
      );
    } else {
      triggerNode.parentNode.classList.toggle(ACTIVE_TRIGGER);
    }

  },

  /**
   * Deactivates the provided trigger or the current trigger. If the trigger is
   *   the menu, forwards to closeSideMenu
   * @param {Node} _triggerNode
   * @see closeSideMenu
   */
  deactivateTrigger: function (_triggerNode) {
    var triggerNode = _triggerNode || this.currentTrigger;

    if (!triggerNode) {
      return;
    }

    var triggerData = triggerNode.dataset ? triggerNode.dataset.trigger : triggerNode.getAttribute('data-trigger');

    this.currentTrigger = null;

    if (triggerData === 'menu') {
      this.closeSideMenu(triggerNode);
      return;
    }

    if (triggerData) {
      this.headerContainer.classList.remove(
        `${ACTIVE_TRIGGER}--${triggerData}`
      );
    } else {
      triggerNode.parentNode.classList.remove(ACTIVE_TRIGGER);
    }
  },

  /**
   * Closes all active panels based on the target of the mouse event
   * @param {MouseEvent} e
   * @see deactivatePanel
   */
  handleClickOutside: function (e) {
    var target = e.target;
    var prevPanel = this.previousPanel;
    var found = false;

    while (target && target.parentNode) {
      if (target === prevPanel) {
        found = true;
        break;
      }
      target = target.parentNode;
    }

    if (!found) {
      this.deactivatePanel();
    }
  },

  /**
   * Resets all currently active triggers and panels
   * @see deactivateTrigger
   * @see deactivatePanel
   */
  reset: function () {
    var headerContainer = document.getElementById(`${NS}header--container`);
    var radios = headerContainer.querySelectorAll(`input[type="radio"].${NS}accordion__active`);

    var i, len = radios.length;
    for (i = 0; i < len; i++) {
      radios[i].checked = false;
    }

    this.deactivateTrigger();
    this.deactivatePanel();
  },

  /**
   * Opens the side menu and triggers an animation using request animation frame.
   *   Thank you IE11...
   * @param {Node} triggerNode
   */
  openSideMenu: function (triggerNode) {
    document.body.classList.add(OVERFLOW_HIDE);

    var triggerData = triggerNode.dataset ? triggerNode.dataset.trigger : triggerNode.getAttribute('data-trigger');

    this.headerContainer.classList.add(
      `${ACTIVE_TRIGGER}--${triggerData}`
    );

    var offscreen = this.menuOffscreen;

    requestAnimationFrame(function () {
      var i, len;
      if (offscreen && offscreen.length) {
        for (i=0, len = offscreen.length; i< len; i++) {
          offscreen[i].style.transform = 'translateX(0)';
        }
      }
    });
  },

  /**
   * Closes the side menu using request animation frame and setTimeout to remove
   *   classes. Thanks again IE11...
   * @param {Node} triggerNode
   */
  closeSideMenu: function (triggerNode) {
    var offscreen = this.menuOffscreen;
    var headerContainer = this.headerContainer;

    /// animate off screen
    requestAnimationFrame(function () {
      var i, len;
      if (offscreen && offscreen.length) {
        for (i=0, len = offscreen.length; i< len; i++) {
          offscreen[i].style.transform = null;
        }
      }
    });

    // turn off
    setTimeout(function() {
      document.body.classList.remove(OVERFLOW_HIDE);
      var triggerData = triggerNode.dataset ? triggerNode.dataset.trigger : triggerNode.getAttribute('data-trigger');

      // remove trigger
      headerContainer.classList.remove(
        `${ACTIVE_TRIGGER}--${triggerData}`
      );
    }, 200);

  }
};


module.exports = Guava;