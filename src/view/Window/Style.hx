package src.view.window;

import js.Browser;

class Style {

	/* =======================================================================
		Set
	========================================================================== */
	public static function set():Void {

		var element : Dynamic = Browser.document.createElement('link');
		element.id   = "onigiri-style";
		element.type = "text/css";
		element.rel  = "stylesheet";
		element.href = "http://192.168.0.134:8888/tokyo/browser-insert/onigiri/css/style.css";

		Browser.document.getElementsByTagName('head').item(0).appendChild(element);
	}

}
