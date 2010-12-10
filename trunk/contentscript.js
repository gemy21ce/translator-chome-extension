var settings;
settingsResponse=function(resp){
    settings=resp;
}

chrome.extension.sendRequest({
    'action':'getsettings'
}, settingsResponse);

var ev=false;
document.onkeydown=function(e){
    if(navigator.userAgent.indexOf("Mac")!= -1){
        if(e.keyCode==91){
            ev=true;
        }
    }else{
        if(e.keyCode==17){
            ev=true;
        }
    }
}
document.onkeyup=function(e){
    if(navigator.userAgent.indexOf("Mac")!= -1){
        if(e.keyCode==91){
            ev=false;
        }
    }else{
        if(e.keyCode==17){
            ev=false;
        }
    }
    
}
document.onmouseup = function(e){
    if(settings.popupAction.actionType == 'ctrl'){
        if(ev){
            requesting();
        }
    }else if(settings.popupAction.actionType == 'selection'){
        requesting();
    }
    
}
var requesting=function(){
    if((window.getSelection().anchorNode.parentNode.id).substr(0, 5)=='trcrx'){
        return;
    }
    var text=document.getSelection();
    if(text != null && trimAll(''+text+'').length != 0 && (''+text+'').length < 355){
        tooltip.show("\u062c\u0627\u0631\u064a \u0627\u0644\u0628\u062d\u062b \u0648\u0627\u0644\u062a\u0631\u062c\u0645\u0647\......")
        var ob={
            'action' : 'gettranslation',
            'translate':''+text+''
        }
        tooltip.pageX=window.event.pageX;
        tooltip.pageY=window.event.pageY;

        chrome.extension.sendRequest(ob, onResponse);
    }
}
onResponse=function(ob){
    tooltip.show(ob.text,null,ob.src,ob.target);
}
//document.onmousedown=function(){
//    tooltip.hide()
//};
function trimAll( strValue ) {
    /************************************************
DESCRIPTION: Removes leading and trailing spaces.

PARAMETERS: Source string from which spaces will
  be removed;

RETURNS: Source string with whitespaces removed.
*************************************************/
    var objRegExp = /^(\s*)$/;

    //check for all spaces
    if(objRegExp.test(strValue)) {
        strValue = strValue.replace(objRegExp, '');
        if( strValue.length == 0)
            return strValue;
    }

    //check for leading & trailing spaces
    objRegExp = /^(\s*)([\W\w]*)(\b\s*$)/;
    if(objRegExp.test(strValue)) {
        //remove leading and trailing whitespace characters
        strValue = strValue.replace(objRegExp, '$2');
    }
    return strValue;
}