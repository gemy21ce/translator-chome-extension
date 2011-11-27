/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    $("#translateButton").click(function(e){
        if ($("#textHolder").attr('value')!= ""){
            if( $("#textHolder").attr('value').length > 355){
                $("div#error").html('text too long');
            }else{
                $("div#error").html('');
            }
            translate($("#textHolder").attr('value'),setTranslation);
        }else{
            $("#translation").html("");
        }
    });
//    if(window.localStorage.words){
//        var text=JSON.parse(window.localStorage.words).text;
//        translate(text,setTranslation);
//        $("#textHolder").attr('value',text);
//    }
//    delete window.localStorage.words;
    var lang=JSON.parse(window.localStorage.targetLang).lang;

    //set settings
    $("#radio_"+lang).attr('selected',true);
    $("#optionpageLink").click(POPUP.OpenOptionPage);
});
var setTranslation=function(translation){
    $("div#translation").html(translation.text);
}
var POPUP={
    setLang:function(lang){
        window.localStorage.targetLang=JSON.stringify({
            lang:lang
        });
        $("#translateButton").trigger("click");
    },
    OpenOptionPage:function(){
        var url=chrome.extension.getURL("/views/options.html")
        chrome.tabs.create({
            url:url
        });
    }
}

