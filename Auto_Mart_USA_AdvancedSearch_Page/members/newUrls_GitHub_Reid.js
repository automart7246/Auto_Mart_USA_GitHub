//Found Method to Replace URL Pattern from Manheim Details Webpage with my Copy Webpage
    //at https://stackoverflow.com/questions/1789181/jquery-replace-part-of-a-url
    $('div.uhf-responsive > header > div.uhf-logo a').attr('href', 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_Landing_Page/members/landingPage.html#/');

    $('div.uhf-responsive > header > div.uhf-menu--primary uhf-menu--offscreen uhf-accordion > div.uhf-panel--buy uhf-accordion__section > div.uhf-accordion__panel > div.uhf-accordion__panel__drawer > div.uhf-menu__group uhf-menu__group--1 > div.uhf-menu__category > ul.uhf-menu__category__items > li.uhf-menu__category__item a').each(function(){
      $(this).attr('href', $(this).replace('https://members.manheim.com/members/results#', 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_PowerSearch_Page/members/results.html#'));
    });
    $('.promobanner__details--text a').each(function() {
      $(this).attr('href', $(this).replace('https://members.manheim.com/members/results#', 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_PowerSearch_Page/members/results.html#'));
    });

    //Make Filter Button Clickable
    //Found Method at https://stackoverflow.com/questions/55063432/button-not-clickable-through-javascript
    var button = $('div#uhf-header--container > header > div#basic_search > span.fake-prism > button.btn-fake-prism.btn-fake-prism-primary.btn-fake-prism--sm.SearchOverlay__toggle-button');
    var overlay = $('div#basic_search_overlay > div.SearchOverlay__container.fake-prism')
    console.log(overlay.text())
    $(document).ready(function() {
      button.click(function() {
        overlay.fadeIn(300);
      });
    });

    //Replace Root of URL for Makes, Vehicle Types, and Advanced Search
    var items = $('div.uhf-menu--primary.uhf-menu--offscreen.uhf-accordion > div.uhf-panel--buy.uhf-accordion__section > div.uhf-accordion__panel > div.uhf-accordion__panel__drawer > div.uhf-menu__group.uhf-menu__group--1 > div.uhf-menu__category > ul.uhf-menu__category__items > li.uhf-menu__category__item a');
    console.log(items.text());
    items.each(function() {$(this).attr('href', $(this).attr('href').replace('https://members.manheim.com/members/results#', 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_PowerSearch_Page/members/results.html#'))});
    var advanced_search = $('div.uhf-menu--primary.uhf-menu--offscreen.uhf-accordion > div.uhf-panel--buy.uhf-accordion__section > div.uhf-accordion__panel > div.uhf-accordion__panel__drawer > div.uhf-menu__group.uhf-menu__group--1 > div.uhf-menu__category.advanced-search > ul.uhf-menu__category__items > li.uhf-menu__category__item a');
    console.log(advanced_search.text());
    advanced_search.attr('href', advanced_search.attr('href').replace('https://members.manheim.com/members/advancedSearch', 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_AdvancedSearch_Page/members/advancedSearch.html#'));