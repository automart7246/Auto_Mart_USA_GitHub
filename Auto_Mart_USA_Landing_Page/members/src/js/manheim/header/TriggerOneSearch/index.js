var TriggerOneSearch = {

    init: function(env, tokenobj, urlsobj, renderBasicSearchWidget){
        if ( typeof oneSearch === undefined){
            console.log("onesearch undefined condition true");
            return;
        }
        oneSearch({
            language: "en",
            enableLogging: false,
            environment: env,
            oAuth: tokenobj.bearerToken,
            authTkt: tokenobj.originalToken,
            contactGuid: tokenobj.contactGuid,
            tourId: '10624',
            workbookType: "NEW_WORKBOOK",
            urls: urlsobj,
            customClassName: "onesearch-hostapp-manheim",
        })

        if (typeof renderBasicSearchWidget !== "undefined" && renderBasicSearchWidget) {
            oneSearch().renderMcomBasicSearchWidget({
                target: "basic_search",
                coveringTarget: "basic_search_overlay",
            });
        }

        oneSearch().renderKeywordSearch({
            target: "one_search_keyword_search",
        });
    }

};

module.exports = TriggerOneSearch;