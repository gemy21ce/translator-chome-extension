if(! window.localStorage.targetLang){
    window.localStorage.targetLang=JSON.stringify({
        lang:'ar'
    });
}
if(! window.localStorage.popupAction){
    window.localStorage.popupAction=JSON.stringify({
        actionType:'selection'
    });
}
if((! window.localStorage.popupIcon)){
    window.localStorage.popupIcon=JSON.stringify({popupIcon:"true"});
}

/**
       * Handles data sent via chrome.extension.sendRequest().
       * @param request Object Data sent in the request.
       * @param sender Object Origin of the request.
       * @param callback Function The method to call when the request completes.
       */
function onRequest(request, sender, callback) {
    if (request.action == 'gettranslation') {
        var translatetext=request.translate;
        translate(translatetext,callback);
    }
    if(request.action=='getsettings'){
        var settings={
            popupAction:JSON.parse(window.localStorage.popupAction)
            };
        callback(settings);
    }
}

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    var popupIcon=JSON.parse(window.localStorage.popupIcon).popupIcon;
    if(popupIcon == 'true'){
        chrome.pageAction.show(tabId);
    }
});
