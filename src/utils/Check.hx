package src.utils;

import js.Browser;
import js.html.Element;

class Check {

	/* =======================================================================
		init
	========================================================================== */
	public static function init():Bool {

		var elem : Element = Browser.document.getElementById('box-window');

		if (Browser.document.readyState != 'complete') {

			Browser.alert('ブラウザが処理中です。動作が完了してから（読み込み中止ボタンがリロードボタンに変わってから）再度ブックマークレットを実行してください。');
			return false;
		}

		if (untyped elem) {

			Browser.alert('実行済みです。');
			return false;

		}

		untyped if (untyped __typeof__(jQuery) == "undefined" || untyped __typeof__(jQuery) == null || untyped __typeof__($)== "undefined") {

			loadJQuery();
			trace("jQueryが読み込まれていなかったので、読み込みました。");

			var script = Browser.document.getElementById('onigiri-script');
			script.parentNode.removeChild(script);

			var time : Date = Date.now();

			var s : Dynamic = Browser.document.createElement('scr'+'ipt');
			s.charset  = 'UTF-8';
			s.language = 'javascr'+'ipt';
			s.type     = 'text/javascr'+'ipt';
			s.id       = 'onigiri-scr'+'ipt';
			s.src      = 'http://192.168.0.134:8888/tokyo/browser-insert/onigiri.js?t='+time.toString();
			Browser.document.getElementsByTagName('head')[0].appendChild(s);

		}

		return true;
	}

	/* =======================================================================
		Load JQuery
	========================================================================== */
	private static function loadJQuery() {

		var onigiriScript = Browser.document.getElementById('onigiri-script');
		var script : Dynamic = Browser.document.createElement('script');
		script.type = "text/javascript";
		script.id   = "box-window-JQuery";
		script.src  = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js";

		onigiriScript.parentNode.insertBefore(script,onigiriScript);

	}

}
