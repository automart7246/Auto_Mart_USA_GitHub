//Add URL to Search Button on Advanced Search Page
    //Found Method at https://stackoverflow.com/questions/6693566/href-around-input-type-submit
    var search = $('div.mui-text-right.mui-m-b > input.btnInput.btnPrimary');
    console.log(search.attr('value'));
    search.attr('onclick', "location.href='file:///C:/Users/bjros/OneDrive/Desktop/Projects/Auto_Mart_USA_GitHub/Auto_Mart_USA_PowerSearch_Page/members/results.html';");