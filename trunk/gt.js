/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

google.load("language", "1");
var translate=function(text,callback){
    var target=JSON.parse(window.localStorage.targetLang).lang;
    //chrome.contextMenus.update(translator,{"title":object.selectionText})
    google.language.detect(text.substr(0, 50), function(rslt) {
        if (!rslt.error && rslt.language) {
            //check length
            google.language.translate(text, rslt.language, target,
                function(result) {
                    if (result.translation) {
                        callback({
                            text:result.translation,
                            src:LANGLIST[target][rslt.language],
                            target:LANGLIST[target][target]
                        });
                    }
                });
        }
    });
}
var LANGLIST={
    'ar':{
        'ar':'\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
        'en':'\u0627\u0644\u0627\u0646\u062c\u0644\u064a\u0632\u064a\u0629'
    },
    'en':{
        'ar':'Arabic',
        'en':'English'
    }
}