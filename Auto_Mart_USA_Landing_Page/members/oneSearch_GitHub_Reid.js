oneSearch({
    language : "en",
    enableLogging : false,
    environment : 'production',
    oAuth : '65ey4bcrgn677g4rpe5x8vfb',
    authTkt : 'ZmZmZGFhZjI5MTkxNTgwMzQ3MmFlN2EwYzJkZjE5ZjM1ZmVhNTc5ZGF1dG9tYXJ0dXNhNzMyMCEhQVVUTytNQVJUK1VTQStMb29rZXI=',
    contactGuid :  'a32a0c1a-8a05-eb11-99e5-00505697e50c',
    tourId: 10624,
    workbookType: 'NEW_WORKBOOK',
    urls : {
      results : 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_PowerSearch_Page/members/results.html#', //No need to pass domain
      advancedSearch : 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_AdvancedSearch_Page/members/advancedSearch.html#',
      basicSearch : 'https://automart7246.github.io/Auto_Mart_USA_GitHub/Auto_Mart_USA_AdvancedSearch_Page/members/advancedSearch.html#',
      login : "/gateway/logout",
      workbook : "https://www.manheim.man-qa2.com/members/powersearch/workbook.do?WT.svl=m_uni_hdr",
      allSavedSearches: "/members/savedSearch",
      workbookHost: 'https://automart7246.github.io/Auto_Mart_USA_GitHub/'
    },
  });
  oneSearch().renderMcomAdvancedSearch({
    target : "onesearch_advance_search_form"
  });