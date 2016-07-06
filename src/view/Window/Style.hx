package src.view.window;

import js.Browser;
import js.html.Element;

class Style {

	/* =======================================================================
		Set
	========================================================================== */
	public static function set():Void {

		var element : Dynamic = Browser.document.createElement('link');
		element.id   = "onigiri-style";
		element.type = "text/css";
		element.rel  = "stylesheet";
		element.href = "http://192.168.0.68:8888/tokyo/Insert/onigiri/css/style.css";

		Browser.document.getElementsByTagName('head').item(0).appendChild(element);
	}

}
