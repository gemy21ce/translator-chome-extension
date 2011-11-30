/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
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
                    }else{
                        google.language.translate(text, 'en', target,function(result){
                            callback({
                                text:result.translation,
                                src:LANGLIST[target]['en'],
                                target:LANGLIST[target][target]
                            });
                        });
                    }
                });
        }
    });
}*/

//using api v2
var APIKey='AIzaSyCAZ_Xm_CTFDDeGClbU6um_e0j21WjgOfc';
var charLimit = 1000;
var v2 = {
    detect:{
        url:'https://www.googleapis.com/language/translate/v2/detect',
        params:{
            key:APIKey,
            q:''
        }
    },
    translate:{
        url:'https://www.googleapis.com/language/translate/v2',
        params:{
            key:APIKey,
            source:'',
            target:'',
            q:''
        }
    }
}
var translate = function(text,callback){
    //checking the char limit
    var target=JSON.parse(window.localStorage.targetLang).lang;
    if(! window.localStorage.usedChars){
        window.localStorage.usedChars = 0;
    }
    var usedChars = parseInt(window.localStorage.usedChars);
    console.log(charLimit , usedChars,charLimit < usedChars)
    if (charLimit < usedChars){
        callback({
            text:'Limit Exceeded',
            src:LANGLIST[target]['en'],
            target:LANGLIST[target][target]
        });
        return;
    }
    usedChars += text.length;
    window.localStorage.usedChars = usedChars;
    v2.detect.params.q = text.substr(0, 20);
    $.ajax({
        url:v2.detect.url,
        data:v2.detect.params,
        complete:function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                var resp = JSON.parse(jqXHR.response);
                var source = resp.data.detections[0][0].language;
                v2.translate.params.source = source;
                v2.translate.params.target = target;
                v2.translate.params.q = text;
                $.ajax({
                    url:v2.translate.url,
                    data:v2.translate.params,
                    complete:function(jqXHR, textStatus){
                        if(jqXHR && jqXHR.status == 200){
                            var resp = JSON.parse(jqXHR.response);
                            callback({
                                text:resp.data.translations[0].translatedText,
                                src:LANGLIST[target]['en'],
                                target:LANGLIST[target][target]
                            });
                        }
                    }
                });
            }else{
                callback({
                    text:'Daily Limit Exceeded',
                    src:LANGLIST[target]['en'],
                    target:LANGLIST[target][target]
                });
            }
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