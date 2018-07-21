/*
jQWidgets v5.1.0 (2017-Aug)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(t){t.jqx.jqxWidget("jqxSplitter","",{}),t.extend(t.jqx._jqxSplitter.prototype,{defineInstance:function(){var e={width:300,height:300,panels:[],orientation:"vertical",disabled:!1,splitBarSize:5,touchSplitBarSize:15,panel1:null,panel2:null,_eventsMap:{mousedown:t.jqx.mobile.getTouchEventName("touchstart"),mouseup:t.jqx.mobile.getTouchEventName("touchend"),mousemove:t.jqx.mobile.getTouchEventName("touchmove"),mouseenter:"mouseenter",mouseleave:"mouseleave"},_isTouchDevice:!1,_isNested:!1,resizable:!0,touchMode:"auto",showSplitBar:!0,initContent:null,_events:["resize","expanded","collapsed","resizeStart","layout"]};return this===t.jqx._jqxSplitter.prototype?e:(t.extend(!0,this,e),e)},createInstance:function(){this.render()},_initOverlay:function(e){if(this.overlay||"undefined"==e)this.overlay.remove(),this.overlay=null;else if(1==e){this.overlay=t("<div style='z-index: 100; background: #fff;'></div>"),this.overlay.css("opacity",.01),this.overlay.css("position","absolute"),this.overlay.appendTo(t(document.body));this.host.coord();this.overlay.css("left","0px"),this.overlay.css("top","0px"),this.overlay.width(t(window).width()),this.overlay.height(t(window).height()),this.overlay.addClass("jqx-disableselect"),"horizontal"==this.orientation?this.overlay.css("cursor","row-resize"):this.overlay.css("cursor","col-resize")}},_startDrag:function(e){return!(e.target!=this.splitBarButton[0]&&!this.disabled)||(!(!this.panels[0].collapsed&&!this.panels[1].collapsed&&this.resizable)||(null!=this.overlay||(this._dragging=!0,this._initOverlay(!0),this._dragStart=t.jqx.position(e),!1)))},_drag:function(e){if(this.panels[0].collapsed||this.panels[1].collapsed||this.disabled)return!0;if(!this._dragging)return!0;var s="horizontal"==this.orientation?"top":"left",i="vertical"==this.orientation?"width":"height";if(this._position=t.jqx.position(e),this.overlay&&!this._splitBarClone&&Math.abs(this._position[s]-this._dragStart[s])>=3){var a=this.splitBar.coord();return this._cloneStart={left:a.left,top:a.top},this._splitBarClone=this._createSplitBarClone(),void this._raiseEvent(3,{panels:this.panels})}if(this._splitBarClone){var l,r,n=this.host[i](),h=n/100,o=this._splitBarClone[i]()+2,p=parseInt(this.host.coord()[s]),d=this._position[s]-this._dragStart[s]+this._cloneStart[s]-p;return 0>d&&(d=0),d>n+0-o&&(d=n+0-o),l=this.panels[0].min,-1!=(r=this.panels[1].min).toString().indexOf("%")&&(r=parseFloat(r)*h),-1!=l.toString().indexOf("%")&&(l=parseFloat(l)*h),this._splitBarClone.removeClass(this.toThemeProperty("jqx-splitter-splitbar-invalid")),d<l&&(this._splitBarClone.addClass(this.toThemeProperty("jqx-splitter-splitbar-invalid")),d=l),d>n+0-o-r&&(this._splitBarClone.addClass(this.toThemeProperty("jqx-splitter-splitbar-invalid")),d=n+0-o-r),this._splitBarClone.css(s,d),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1}return!0},resize:function(t,e){this.width=t,this.height=e,this._arrange()},_resize:function(){var t="horizontal"==this.orientation?"height":"width",e="horizontal"==this.orientation?"top":"left",s=this._splitBarClone.css(e),i=this.host[t](),a=1/(i/100);-1!=this.panels[0].size.toString().indexOf("%")?(this.panels[0].size=parseFloat(s)*a+"%",this.panels[1].size=100-parseFloat(s)*a+"%"):(this.panels[0].size=parseFloat(s),this.panels[1].size=i-parseFloat(s)),this._layoutPanels(),this._raiseEvent(0,{panels:this.panels})},_stopDrag:function(){if(this._dragging&&this._initOverlay(),this._dragging=!1,this._splitBarClone){if(this.panels[0].collapsed||this.panels[1].collapsed||this.disabled)return!0;this._resize(),this._splitBarClone.remove(),this._splitBarClone=null}},_createSplitBarClone:function(){var t=this.splitBar.clone();return t.fadeTo(0,.7),t.css("z-index",99999),"vertical"==this.orientation?t.css("cursor","col-resize"):t.css("cursor","row-resize"),this.host.append(t),t},_eventName:function(t){return this._isTouchDevice?this._eventsMap[t]:t},_addHandlers:function(){var e=this;if(t.jqx.utilities.resize(this.host,function(){e._layoutPanels()}),this.addHandler(this.splitBar,"dragstart."+this.element.id,function(t){return!1}),this.splitBarButton&&(this.addHandler(this.splitBarButton,"click."+this.element.id,function(){var t=function(t){t.collapsed?e.expand():e.collapse()};e.panels[0].collapsible?t(e.panels[0]):e.panels[1].collapsible&&t(e.panels[1])}),this.addHandler(this.splitBarButton,this._eventName("mouseenter"),function(){e.splitBarButton.addClass(e.toThemeProperty("jqx-splitter-collapse-button-hover")),e.splitBarButton.addClass(e.toThemeProperty("jqx-fill-state-hover"))}),this.addHandler(this.splitBarButton,this._eventName("mouseleave"),function(){e.splitBarButton.removeClass(e.toThemeProperty("jqx-splitter-collapse-button-hover")),e.splitBarButton.removeClass(e.toThemeProperty("jqx-fill-state-hover"))})),this.addHandler(t(document),this._eventName("mousemove")+"."+this.element.id,function(t){return e._drag(t)}),this.addHandler(t(document),this._eventName("mouseup")+"."+this.element.id,function(){return e._stopDrag()}),this.addHandler(this.splitBar,this._eventName("mousedown"),function(t){return e._startDrag(t)}),this.addHandler(this.splitBar,this._eventName("mouseenter"),function(){e.resizable&&!e.disabled&&(e.splitBar.addClass(e.toThemeProperty("jqx-splitter-splitbar-hover")),e.splitBar.addClass(e.toThemeProperty("jqx-fill-state-hover")))}),this.addHandler(this.splitBar,this._eventName("mouseleave"),function(){e.resizable&&!e.disabled&&(e.splitBar.removeClass(e.toThemeProperty("jqx-splitter-splitbar-hover")),e.splitBar.removeClass(e.toThemeProperty("jqx-fill-state-hover")))}),(""!=document.referrer||window.frameElement)&&null!=window.top&&window.top!=window.self){var s=null;if(window.parent&&document.referrer&&(s=document.referrer),s&&-1!=s.indexOf(document.location.host)){var i=function(t){e._stopDrag()};window.top.document.addEventListener?window.top.document.addEventListener("mouseup",i,!1):window.top.document.attachEvent&&window.top.document.attachEvent("onmouseup",i)}}},_removeHandlers:function(){this.removeHandler(t(window),"resize."+this.element.id),this.splitBarButton&&(this.removeHandler(this.splitBarButton,"click."+this.element.id),this.removeHandler(this.splitBarButton,this._eventName("mouseenter")),this.removeHandler(this.splitBarButton,this._eventName("mouseleave"))),this.removeHandler(t(document),this._eventName("mousemove")+"."+this.element.id),this.removeHandler(t(document),this._eventName("mouseup")+"."+this.element.id),this.splitBar&&(this.removeHandler(this.splitBar,"dragstart."+this.element.id),this.removeHandler(this.splitBar,this._eventName("mousedown")),this.removeHandler(this.splitBar,this._eventName("mouseenter")),this.removeHandler(this.splitBar,this._eventName("mouseleave")))},render:function(){this.splitBar&&this.splitBar.remove();var e=this.host.children();if(2!=e.length)throw"Invalid HTML Structure! jqxSplitter requires 1 container DIV tag and 2 nested DIV tags.";if(2==e.length){var s=e[0].className.split(" "),i=e[1].className.split(" ");if(-1!=s.indexOf("jqx-reset")&&-1!=s.indexOf("jqx-splitter")&&-1!=s.indexOf("jqx-widget"))throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!";if(-1!=i.indexOf("jqx-reset")&&-1!=i.indexOf("jqx-splitter")&&-1!=i.indexOf("jqx-widget"))throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!"}if(this.host.parent().length>0&&-1!=this.host.parent()[0].className.indexOf("jqx-splitter")){if(-1!=this.element.className.indexOf("jqx-splitter-panel"))throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!";this._isNested=!0,300==this.width&&(this.width="100%"),300==this.height&&(this.height="100%"),"100%"==this.width&&"100%"==this.height&&(this.host.addClass("jqx-splitter-nested"),-1!=this.host.parent()[0].className.indexOf("jqx-splitter-panel")&&this.host.parent().addClass("jqx-splitter-panel-nested"))}this._hasBorder=0==this.host.hasClass("jqx-hideborder")||""!=this.element.style.borderTopWidth,this._removeHandlers(),this._isTouchDevice=t.jqx.mobile.isTouchDevice(),this._validate(),this.panel1.css("left","0px"),this.panel1.css("top","0px"),this.panel2.css("left","0px"),this.panel2.css("top","0px"),this.splitBar=t("<div><div></div></div>"),this.resizable||this.splitBar.css("cursor","default"),this.splitBarButton=this.splitBar.find("div:last"),this._setTheme(),this.splitBar.insertAfter(this.panel1),this._arrange(),0==this.panels[0].collapsible&&0==this.panels[1].collapsible&&this.splitBarButton.hide();this._addHandlers(),this.initContent&&this.initContent(),this.disabled&&this.disable()},_hiddenParent:function(){return t.jqx.isHidden(this.host)},_setTheme:function(){this.panel1.addClass(this.toThemeProperty("jqx-widget-content")),this.panel2.addClass(this.toThemeProperty("jqx-widget-content")),this.panel1.addClass(this.toThemeProperty("jqx-splitter-panel")),this.panel2.addClass(this.toThemeProperty("jqx-splitter-panel")),this.panel1.addClass(this.toThemeProperty("jqx-reset")),this.panel2.addClass(this.toThemeProperty("jqx-reset")),this.host.addClass(this.toThemeProperty("jqx-reset")),this.host.addClass(this.toThemeProperty("jqx-splitter")),this.host.addClass(this.toThemeProperty("jqx-widget")),this.host.addClass(this.toThemeProperty("jqx-widget-content")),this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-"+this.orientation)),this.splitBar.addClass(this.toThemeProperty("jqx-fill-state-normal")),this.splitBarButton.addClass(this.toThemeProperty("jqx-splitter-collapse-button-"+this.orientation)),this.splitBarButton.addClass(this.toThemeProperty("jqx-fill-state-pressed"))},_validate:function(){if(2!=(e=this.host.children()).length)throw"Invalid HTML Structure! jqxSplitter requires two nested DIV tags!";this.panels&&!this.panels[1]?this.panels[0]?this.panels[1]={}:this.panels=[{size:"50%"},{size:"50%"}]:void 0==this.panels&&(this.panels=[{size:"50%"},{size:"50%"}]);var e=this.host.children();this.panel1=this.panels[0].element=t(e[0]),this.panel2=this.panels[1].element=t(e[1]),this.panel1[0].style.minWidth="",this.panel1[0].style.maxWidth="",this.panel2[0].style.minWidth="",this.panel2[0].style.maxWidth="",t.each(this.panels,function(){void 0==this.min&&(this.min=0),void 0==this.size&&(this.size=0),this.size<0&&(this.size=0),this.min<0&&(this.min=0),void 0==this.collapsible&&(this.collapsible=!0),void 0==this.collapsed&&(this.collapsed=!1),0!=this.size&&(-1!=this.size.toString().indexOf("px")&&(this.size=parseInt(this.size)),-1==this.size.toString().indexOf("%")?parseInt(this.min)>parseInt(this.size)&&(this.min=this.size):-1!=this.min.toString().indexOf("%")&&parseInt(this.min)>parseInt(this.size)&&(this.min=this.size))})},_arrange:function(){if(null!=this.width){var t=this.width;"string"!=typeof t&&(t=parseInt(this.width)+"px"),this.host.css("width",t)}if(null!=this.height){var e=this.height;"string"!=typeof e&&(e=parseInt(this.height)+"px"),this.host.css("height",e)}this._splitBarSize=this._isTouchDevice?this.touchSplitBarSize:this.splitBarSize,this.showSplitBar||(this._splitBarSize=0,this.splitBar.hide());var s="horizontal"==this.orientation?"width":"height";this.splitBar.css(s,"100%"),this.panel1.css(s,"100%"),this.panel2.css(s,"100%"),"horizontal"==this.orientation?this.splitBar.height(this._splitBarSize):this.splitBar.width(this._splitBarSize),"vertical"===this.orientation?(this.splitBarButton.width(this._splitBarSize),this.splitBarButton.height(45)):(this.splitBarButton.height(this._splitBarSize),this.splitBarButton.width(45)),this.splitBarButton.css("position","relative"),"vertical"===this.orientation?(this.splitBarButton.css("top","50%"),this.splitBarButton.css("left","0"),this.splitBarButton.css("margin-top","-23px"),this.splitBarButton.css("margin-left","-0px")):(this.splitBarButton.css("left","50%"),this.splitBarButton.css("top","0"),this.splitBarButton.css("margin-left","-23px"),this.splitBarButton.css("margin-top","-0px")),this._layoutPanels()},collapse:function(){if(!this.disabled){var t=-1;this.panels[0].collapsed=this.panels[1].collapsed=!1,this.panels[0].element[0].style.visibility="inherit",this.panels[1].element[0].style.visibility="inherit",this.panels[0].collapsible?t=0:this.panels[1].collapsible&&(t=1),-1!=t&&(this.panels[t].collapsed=!0,this.panels[t].element[0].style.visibility="hidden",this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed")),this._layoutPanels(),this._raiseEvent(2,{index:t,panels:this.panels}),this._raiseEvent(0,{panels:this.panels}))}},expand:function(){if(!this.disabled){var t=-1;this.panels[0].collapsed=this.panels[1].collapsed=!1,this.panels[0].element[0].style.visibility="inherit",this.panels[1].element[0].style.visibility="inherit",this.panels[0].collapsible?t=0:this.panels[1].collapsible&&(t=1),-1!=t&&(this.panels[t].collapsed=!1,this.panels[t].element[0].style.visibility="inherit",this.splitBar.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed")),this._layoutPanels(),this._raiseEvent(1,{index:t,panels:this.panels}),this._raiseEvent(0,{panels:this.panels}))}},disable:function(){this.disabled=!0,this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled")),this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed")),this.splitBarButton.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"))},enable:function(){this.disabled=!1,this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled")),this.splitBar.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed")),this.splitBarButton.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"))},refresh:function(t){1!=t&&this._arrange()},propertyChangedHandler:function(e,s,i,a){"panels"!==s&&"orientation"!==s&&"showSplitBar"!==s?("touchMode"===s&&(e._isTouchDevice=a),"disabled"===s?a?e.disable():e.enable():"theme"===s?t.jqx.utilities.setTheme(i,a,e.host):e.refresh()):e.render()},_layoutPanels:function(){var t,e,s,i,a=this,l="horizontal"==this.orientation?"height":"width",r="horizontal"==this.orientation?"top":"left",n=parseInt(this._splitBarSize)+2;this.showSplitBar||(n=0);var h=this.host[l](),o=h/100,p=1/o,d=p*n,c=this.panel1,u=this.panel2,m=this.panels[0].size;this.panels[0].collapsed&&(s=!0),this.panels[1].collapsed&&(i=!0),t=this.panels[0].min,-1!=(e=this.panels[1].min).toString().indexOf("%")&&(e=parseFloat(e)*o),-1!=t.toString().indexOf("%")&&(t=parseFloat(t)*o),this._isNested&&this._isTouchDevice&&("horizontal"==this.orientation?(c.width(this.host.width()),u.width(this.host.width())):(c.height(this.host.height()),u.height(this.host.height())));if(s){v=Math.max(e,h-n);c[l](0),u[l](v)}else if(i){var v=Math.max(t,h-n);u[l](0),c[l](v)}else if(-1!=m.toString().indexOf("%")){B=100-parseFloat(m);if(c.css(l,parseFloat(m)+"%"),B-=d,u.css(l,B+"%"),(x=u[l]())<e){f=(v=x-e)*p;m=parseFloat(m)+parseFloat(f);var B=100-parseFloat(m);c.css(l,parseFloat(m)+"%"),B-=d,u.css(l,B+"%")}if(c[l]()<t){var f=t*p;c.css(l,parseFloat(f)+"%")}}else{var x=h-m-n;c[0].style[l]!=m+"px"&&c[l](m),u[0].style[l]!=x+"px"&&u[l](x),x<e&&(m+=x-e,u[l](e),c[l](m)),m<t&&c[l](t)}!function(){var t=a.panel1[l]();if(a.splitBar[0].style[r]!=t+"px"){var e=t;"vertical"==a.orientation?(a.splitBar[0].style.borderLeftColor="",a.splitBar[0].style.borderRightColor="",a.splitBarButton[0].style.width=parseInt(a._splitBarSize)+"px",a.splitBarButton[0].style.left="0px"):(a.splitBar[0].style.borderTopColor="",a.splitBar[0].style.borderBottomColor="",a.splitBarButton[0].style.height=parseInt(a._splitBarSize)+"px",a.splitBarButton[0].style.top="0px"),a._hasBorder&&(h-n==t?"vertical"==a.orientation?(a.splitBar[0].style.borderRightColor="transparent",a.splitBarButton[0].style.width=parseInt(a._splitBarSize+1)+"px"):(a.splitBar[0].style.borderBottomColor="transparent",a.splitBarButton[0].style.height=parseInt(a._splitBarSize+1)+"px"):0==t&&("vertical"==a.orientation?(a.splitBar[0].style.borderLeftColor="transparent",a.splitBarButton[0].style.width=parseInt(a._splitBarSize+1)+"px",a.splitBarButton[0].style.left="-1px"):(a.splitBar[0].style.borderTopColor="transparent",a.splitBarButton[0].style.height=parseInt(a._splitBarSize+1)+"px",a.splitBarButton[0].style.top="-1px"))),a.splitBar[0].style[r]=e+"px"}a.panel2[0].style[r]!=t+n+"px"&&(a.panel2[0].style[r]=t+n+"px")}(),this._raiseEvent(4,{panels:this.panels})},destroy:function(){this._removeHandlers(),t.jqx.utilities.resize(this.host,null,!0),this.host.remove()},_raiseEvent:function(e,s){var i=new t.Event(this._events[e]);i.owner=this,i.args=s;this.orientation;var a=new Array;return a[0]={},a[1]={},a[0].size="vertical"==this.orientation?this.panel1[0].offsetWidth:this.panel1[0].offsetHeight,a[1].size="vertical"==this.orientation?this.panel2[0].offsetWidth:this.panel2[0].offsetHeight,a[0].min=this.panels[0].min,a[1].min=this.panels[1].min,a[0].collapsible=this.panels[0].collapsible,a[1].collapsible=this.panels[1].collapsible,a[0].collapsed=this.panels[0].collapsed,a[1].collapsed=this.panels[1].collapsed,i.args.panels=a,this.host.trigger(i)}})}(jqxBaseFramework);

