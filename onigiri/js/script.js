(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Lib = function() { };
js.Lib.__name__ = true;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
var src = {};
src.Main = function() {
	this._filename_ = "onigiri";
};
src.Main.__name__ = true;
src.Main.main = function() {
	src.Main.check();
};
src.Main.check = function() {
	var judge = src.utils.Check.init();
	if(!judge) return;
	src.Main.init();
};
src.Main.init = function() {
	src.view.Window.init();
};
src.utils = {};
src.utils.Check = function() { };
src.utils.Check.__name__ = true;
src.utils.Check.init = function() {
	var elem = window.document.getElementById("box-window");
	if(window.document.readyState != "complete") {
		js.Lib.alert("ブラウザが処理中です。動作が完了してから（読み込み中止ボタンがリロードボタンに変わってから）再度ブックマークレットを実行してください。");
		return false;
	}
	if(elem) {
		js.Lib.alert("実行済みです。");
		return false;
	}
	if(typeof(jQuery) == "undefined" || (typeof(jQuery) == null || typeof($) == "undefined")) {
		src.utils.Check.loadJQuery();
		console.log("jQueryが読み込まれていなかったので、読み込みました。");
		var script = window.document.getElementById("onigiri-script");
		script.parentNode.removeChild(script);
		var time = new Date();
		var s = window.document.createElement("scr" + "ipt");
		s.charset = "UTF-8";
		s.language = "javascr" + "ipt";
		s.type = "text/javascr" + "ipt";
		s.id = "onigiri-scr" + "ipt";
		s.src = "http://192.168.0.68:8888/tokyo/Insert/onigiri.js?t=" + HxOverrides.dateStr(time);
		window.document.getElementsByTagName("head")[0].appendChild(s);
	}
	return true;
};
src.utils.Check.loadJQuery = function() {
	var onigiriScript = window.document.getElementById("onigiri-script");
	var script = window.document.createElement("script");
	script.type = "text/javascript";
	script.id = "box-window-JQuery";
	script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js";
	onigiriScript.parentNode.insertBefore(script,onigiriScript);
};
src.utils.Notification = function(ttl,param) {
};
src.utils.Notification.__name__ = true;
src.utils.Notifications = function() { };
src.utils.Notifications.__name__ = true;
src.utils.Notifications.say = function(ttl,text) {
	var Notification = window.Notification || window.mozNotification || window.webkitNotification;
	src.utils.Notification.requestPermission(function(permission) {
	});
	var instance = new src.utils.Notification(ttl,{ body : text, icon : "http://192.168.0.68:8888/tokyo/Insert/onigiri/img/icon.png"});
	instance.onclick = function() {
		instance.close.bind(instance);
		console.log("onclick");
	};
	instance.onerror = function() {
		console.log("onerror");
	};
	instance.onshow = function() {
		console.log("onshow");
	};
	instance.onclose = function() {
		console.log("onclose");
	};
};
src.view = {};
src.view.Window = function() { };
src.view.Window.__name__ = true;
src.view.Window.init = function() {
	src.view.window.Html.set();
	src.view.window.Style.set();
	src.view.Window._jParent = new js.JQuery("#box-window");
	src.view.window.Header.init(src.view.Window._jParent);
	src.view.window.Drag.set(src.view.Window._jParent);
	src.view.window.Navi.init(src.view.Window._jParent);
	src.view.window.Ability.init(src.view.Window._jParent);
	src.view.Window.view();
};
src.view.Window.view = function() {
	src.view.Window._jParent.css({ opacity : 0, top : "70%", left : "50%", width : 50 + "%", height : 50 + "%", margin : "auto"});
	src.view.Window._jParent.css({ marginTop : -src.view.Window._jParent.height() / 2, marginLeft : -src.view.Window._jParent.width() / 2});
	src.view.Window._jParent.animate({ opacity : 1, top : "50%"},300);
};
src.view.window = {};
src.view.window.Ability = function() { };
src.view.window.Ability.__name__ = true;
src.view.window.Ability.init = function(jParent) {
	src.view.window.Ability._jParent = jParent;
	src.view.window.ability.Getter.set(src.view.window.Ability._jParent);
	src.view.window.ability.Mail.init(src.view.window.Ability._jParent);
};
src.view.window.Drag = function() { };
src.view.window.Drag.__name__ = true;
src.view.window.Drag.set = function(_jParent) {
	var jWindow = new js.JQuery("window");
	_jParent.on("mousedown",function(downE) {
		downE.preventDefault();
		var diffY = downE.clientY - Std.parseInt(_jParent.css("top"));
		var diffX = downE.clientX - Std.parseInt(_jParent.css("left"));
		jWindow.on("mousemove",function(moveE) {
			moveE.preventDefault();
			_jParent.css({ top : moveE.clientY - diffY + "px", left : moveE.clientX - diffX + "px", right : "auto", bottom : "auto"});
			jWindow.on("mouseup",function(upE) {
				jWindow.off("mousemove");
			});
		});
	});
};
src.view.window.Header = function() { };
src.view.window.Header.__name__ = true;
src.view.window.Header.init = function(jParent) {
	src.view.window.Header._jParent = jParent;
	src.view.window.Header._jHeader = src.view.window.Header._jParent.find("header");
	src.view.window.Header.setCloseBtn();
};
src.view.window.Header.setCloseBtn = function() {
	src.view.window.Header._jHeader.find("#close-btn").on("click",function(event) {
		src.view.window.Header._jParent.animate({ opacity : 0, top : Std.parseInt(src.view.window.Header._jParent.css("top")) + 50 + "px"},100,function() {
			src.view.window.Header._jParent.add(new js.JQuery("#onigiri-style")).remove();
		});
	});
};
src.view.window.Header.setStorageBtn = function() {
	src.view.window.Header._jHeader.find("#storage-btn").on("click",function(event) {
		src.view.window.Header._jParent.css({ cursor : "pointer"}).addClass("onStorage");
		src.view.window.Header._jParent.animate({ width : 100 + "px", height : 50 + "px", top : 90 + "%", left : 90 + "%"},100,function() {
			src.view.window.Header._jHeader.children().hide();
			src.view.window.Header._jParent.find("#content").children().hide();
			src.view.window.Header._jParent.on("dblclick",function(dbEvent) {
				src.view.window.Header._jParent.animate({ top : 50 + "%", left : 50 + "%", width : 50 + "%", height : 50 + "%"},200,function() {
					src.view.window.Header._jParent.off("click");
					src.view.window.Header._jParent.css({ cursor : "default"}).removeClass("onStorage");
					src.view.window.Header._jHeader.children().show();
					src.view.window.Header._jParent.find("#content").children().show();
				});
			});
		});
	});
};
src.view.window.Header.setWideBtn = function() {
	var jBtn = src.view.window.Header._jHeader.find("#wide-btn");
	jBtn.on("click",function(event) {
		jBtn.toggleClass("on");
		if(!jBtn.hasClass("on")) {
			var marginTop = -(src.view.window.Header._jParent.height() / 2) / 2;
			var marginLeft = -(src.view.window.Header._jParent.width() / 2) / 2;
			src.view.window.Header._jParent.animate({ top : 50 + "%", left : 50 + "%", width : 50 + "%", height : 50 + "%", marginTop : marginTop, marginLeft : marginLeft},200);
		} else src.view.window.Header._jParent.animate({ top : 0, left : 0, width : 100 + "%", height : 100 + "%", marginTop : 0, marginLeft : 0},200);
	});
};
src.view.window.Html = function() { };
src.view.window.Html.__name__ = true;
src.view.window.Html.set = function() {
	var element = window.document.createElement("div");
	element.id = "box-window";
	element.innerHTML = "<header>\n\t\t\t\t\t<p id=\"close-btn\"></p><p id=\"storage-btn\"></p><p id=\"wide-btn\"></p>\n\t\t\t\t</header>\n\t\t\t\t<div id=\"content\">\n\t\t\t\t\t<nav>\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li><p id=\"nav-home\" class=\"active\">HOME</p></li>\n\t\t\t\t\t\t\t<li><p id=\"nav-about\">ABOUT</p></li>\n\t\t\t\t\t\t\t<li><p id=\"nav-work\">WORK</p></li>\n\t\t\t\t\t\t\t<li><p id=\"nav-board\">BOARD</p></li>\n\t\t\t\t\t\t</ol>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<div class=\"inner\">\n\t\t\t\t\t\t<div id=\"contet-home\" class=\"show contents\">\n\t\t\t\t\t\t\t<p>サイトタイトル : " + window.document.title + "</p>\n\t\t\t\t\t\t\t<p>最終更新日時 : " + window.document.lastModified + "</p>\n\t\t\t\t\t\t\t<p>画像数 : " + window.document.images.length + "</p>\n\t\t\t\t\t\t\t<p>リンク数 : " + window.document.links.length + "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"contet-about\" class=\"contents\">\n\t\t\t\t\t\t\t<p id=\"status-image-size\">画像の大きさ : <span>なし</span></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"contet-work\" class=\"contents\">\n\t\t\t\t\t\t\t<iframe id=\"desk-nets\" src=\"http://graphic-tokyo.dn-cloud.com/cgi-bin/dneo/dneo.cgi?\" width=\"100%\" height=\"300px\"></iframe>\n\t\t\t\t\t\t\t<p id=\"open-secretWindow\">シークレットウィンドウで開く</p>\n\t\t\t\t\t\t\t<p id=\"mail-auto-reload\">Mail自動更新</p>\n\t\t\t\t\t\t\t<p id=\"test\"><" + "?" + " php echo 11111; ?" + "></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"contet-board\" class=\"contents\">\n\t\t\t\t\t\t\t<div id=\"board-area\">\n\t\t\t\t\t\t\t\t<input id=\"board-input\" type=\"text\" name=\"name\" size=\"30\" maxlength=\"20\" ></input>\n\t\t\t\t\t\t\t\t<p id=\"board-write\">投稿する</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>";
	window.document.body.appendChild(element);
};
src.view.window.Navi = function() { };
src.view.window.Navi.__name__ = true;
src.view.window.Navi.init = function(jParent) {
	src.view.window.Navi._jParent = jParent;
	var jNav = jParent.find("nav");
	var jContents = jParent.find(".contents");
	var jBtn = jNav.find("p");
	jBtn.on("click",function(event) {
		var jTarget = $(this);
		if(jTarget.hasClass("active")) return;
		jContents.removeClass("show");
		jBtn.removeClass("active");
		jTarget.addClass("active");
		var id = jTarget.prop("id").split("-")[1];
		jContents.filter("#contet-" + id).addClass("show");
	});
};
src.view.window.Style = function() { };
src.view.window.Style.__name__ = true;
src.view.window.Style.set = function() {
	var element = window.document.createElement("link");
	element.id = "onigiri-style";
	element.type = "text/css";
	element.rel = "stylesheet";
	element.href = "http://192.168.0.68:8888/tokyo/Insert/onigiri/css/style.css";
	window.document.getElementsByTagName("head").item(0).appendChild(element);
};
src.view.window.ability = {};
src.view.window.ability.Getter = function() { };
src.view.window.ability.Getter.__name__ = true;
src.view.window.ability.Getter.set = function(jParent) {
	src.view.window.ability.Getter._jParent = jParent;
	src.view.window.ability.Getter.setOnMouseGetState();
};
src.view.window.ability.Getter.setOnMouseGetState = function() {
	var jImageSizeText = src.view.window.ability.Getter._jParent.find("#status-image-size").find("span");
	new js.JQuery("img").on("mouseover",function(event) {
		var jTarget = $(this);
		var status = "width:" + jTarget.width() + ";";
		status += "height:" + jTarget.height() + ";";
		jImageSizeText.html(status);
	});
};
src.view.window.ability.Mail = function() { };
src.view.window.ability.Mail.__name__ = true;
src.view.window.ability.Mail.init = function(jParent) {
	src.view.window.ability.Mail._jParent = jParent;
	var jWindow = new js.JQuery("window");
	var href = jWindow.location.href;
	src.view.window.ability.Mail._jBtn = new js.JQuery("#mail-auto-reload");
	if(href.indexOf("192.168.90.158/") == -1) return; else src.view.window.ability.Mail.set();
};
src.view.window.ability.Mail.set = function() {
	var isOnFocus = true;
	src.view.window.ability.Mail._jBtn.on("click",function(event) {
		src.view.window.ability.Mail.onClick();
	});
};
src.view.window.ability.Mail.onClick = function() {
	src.view.window.ability.Mail._jBtn.toggleClass("on");
	if(src.view.window.ability.Mail._jBtn.hasClass("on")) {
		console.log("ActiveMail自動更新開始します。");
		var jIframe = new js.JQuery("#contentIframe").contents();
		var jMenubtns = jIframe.find("#rmail_list_menu_buttons");
		var jReloadBtn = jMenubtns.find("#_mail_action_button_reload");
		var jFolder = jIframe.find("#mail_folder_xtree");
		var jBox = jFolder.find("tr[title=\"受信箱\"]").find(".standartTreeRow").find("span");
		var jPost = new js.JQuery("#footer_scroll_contents").find(".news_link");
		jReloadBtn.click();
		var INTARVAL = 10000;
		var MAILBOX = jBox.text();
		src.view.window.ability.Mail._timer = new haxe.Timer(INTARVAL);
		src.view.window.ability.Mail._timer.run = function() {
			src.view.window.ability.Mail.setTimer(jReloadBtn,MAILBOX,jBox,jIframe);
		};
	} else {
		console.log("ActiveMail自動更新を止めました。");
		src.view.window.ability.Mail._timer.stop();
	}
};
src.view.window.ability.Mail.setTimer = function(jReloadBtn,MAILBOX,jBox,jIframe) {
	jReloadBtn.click();
	console.log("更新しました。");
	if(MAILBOX != jBox.text()) {
		var length = jBox.text().split("受信箱").join("");
		if(length == "（0）") return;
		var jMailBox = jIframe.find("#divListGrid").find(".objbox");
		var jMailList = jMailBox.find(".obj").find("tbody").find("tr");
		var jFirstMail = jMailList.eq(1);
		var title = jFirstMail.find("td").eq(5).text();
		var name = jFirstMail.find("td").eq(6).text();
		MAILBOX = jBox.text();
		console.log(jMailList.find(".unseen_mail"));
		var setText = length + "件のメールがあります。\n";
		setText += "件名:" + title + "\n" + "送信者:" + name;
		src.utils.Notifications.say("メール",setText);
	}
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
var q = window.jQuery;
js.JQuery = q;
src.Main.main();
})();
