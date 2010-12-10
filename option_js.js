/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var OPTIONS={
    init:function(){
        var lang=JSON.parse(window.localStorage.targetLang).lang;
        var popupActionType=JSON.parse(window.localStorage.popupAction).actionType;
        var popupIcon=JSON.parse(window.localStorage.popupIcon).popupIcon;

        //set settings
        $("#radio_"+lang).attr('checked',true);
        $("#popupaction_"+popupActionType).attr('checked',true);
        $("#popupicon_"+popupIcon).attr('checked',true);

        //click action
        $("input[name=lang]").each(function(){
            $(this).click(function(){
                OPTIONS.setLang(this.value);
            });
        });
        $("input[name=popupaction]").each(function(){
            $(this).click(function(){
                OPTIONS.setPopupAction(this.value);
            });
        });
        $("input[name=popupicon]").each(function(){
            $(this).click(function(){
                OPTIONS.setPopupIcon(this.value);
            });
        });

        $("#resetbutton").click(function(){
            OPTIONS.reset();
        });
        $("#savebutton").click(function(){
            OPTIONS.save();
        });
        
        if(navigator.userAgent.indexOf("Mac")!= -1){
            $("#mac").html('\u0627\u0644\u0638\u0647\u0648\u0631 \u0645\u0639 CMD + \u0646\u0642\u0631\u062a\u064a\u0646 \u0639\u0644\u0649 \u0627\u0644\u0643\u0644\u0645\u0629');
        }

//        $("span.option").each(function(){
//            $(this).css('cursor','pointer').click(function(){
//                $(this).prev().attr('checked',true);
//            });
//        })
    },
    setLang:function(lang){
        window.localStorage.targetLang=JSON.stringify({
            lang:lang
        });
    },
    setPopupAction:function(action){
        window.localStorage.popupAction=JSON.stringify({
            actionType:action
        });
    },
    setPopupIcon:function(iconstatus){
        window.localStorage.popupIcon=JSON.stringify({
            popupIcon:iconstatus
        });
    },
    reset:function(){
        this.setLang('ar');
        this.setPopupAction('selection');
        this.setPopupIcon("true");
        
        this.init();
    },
    save:function(){
        $("#saved").fadeIn("slow");
        setTimeout('$("#saved").fadeOut("slow");',1500);

    }
}

$(function(){
    OPTIONS.init();
});
