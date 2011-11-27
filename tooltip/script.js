var tooltip=function(){
    var id = 'tt';
    var top = 3;
    var left = 3;
    var maxw = 300;
    var speed = 10;
    var timer = 20;
    var endalpha = 95;
    var alpha = 0;
    var crx_a,crx_b,crx_c,crx_d,crx_e,crx_f,crx_g,crx_h,crx_i,crx_l;
    var tt,t,c,b,h;
    var ie = document.all ? true : false;
    return{
        show:function(v,w,x,z){
            if(!tt){
                //root div element.
                tt=document.createElement("div");
                tt.setAttribute("id", "trcrx_igd_bubble");
                //x close div.
                crx_b=document.createElement("div");
                crx_b.setAttribute("id", "trcrx_close_x");
                crx_b.setAttribute("style", "background-image: url("+chrome.extension.getURL("/tooltip/close-x.png")+");");
                crx_b.onclick=function(){
                    tooltip.hide();
                }
                // english to arabic
                crx_l=document.createElement("div");
                crx_l.setAttribute("id", "trcrx_language_ar");
                //translation text div.
                crx_c=document.createElement("li");
                crx_c.setAttribute("id", "trcrx_igd_subdef");
                tt.appendChild(crx_b);
                tt.appendChild(crx_l);
                tt.appendChild(crx_c);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            tt.style.display = 'block';
            crx_c.innerHTML = v;
            if(x!= null && z!= null)
                crx_l.style.display='block';
            else
                crx_l.style.display='none';
            //crx_l.innerHTML = "<b>" + x + "</b>" + " &#187; " + "<b>" + z + "</b>"
	    crx_l.innerHTML = "<b id='trcrx_p'>" + x + "</b>" + " &#187; " + "<b id='trcrx_p'>" + z + "</b>";
            tt.style.width = w ? w + 'px' : 'auto';
            if(!w && ie){
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block';
            }
            if(tt.offsetWidth > maxw){
                tt.style.width = maxw + 'px'
            }
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function(){
                tooltip.fade(1)
            },timer);
        },
        pos:function(e){
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            if(tooltip.pageY < tt.offsetHeight){
                tooltip.pageY+=tt.offsetHeight;
            }
            if((tooltip.pageX + tt.offsetWidth) > window.innerWidth){
                tooltip.pageX -=tt.offsetWidth;
            }
            u=tooltip.pageY;
            l=tooltip.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px';
        },
        staticpost:function(){
            tt.style.top = (tooltip.pageY - h) + 'px';
            tt.style.left = (tooltip.pageX + left) + 'px';
        },
        fade:function(d){
            var a = alpha;
            if((a != endalpha && d == 1) || (a != 0 && d == -1)){
                var i = speed;
                if(endalpha - a < speed && d == 1){
                    i = endalpha - a;
                }else if(alpha < speed && d == -1){
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            }else{
                clearInterval(tt.timer);
                if(d == -1){
                    tt.style.display = 'none'
                }
            }
        },
        hide:function(){
            if(! tt){
                return;
            }
            clearInterval(tt.timer);
            tt.timer = setInterval(function(){
                tooltip.fade(-1)
            },timer);
        }
    };
}();