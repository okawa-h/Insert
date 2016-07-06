package src.view;

import js.JQuery;
import src.view.window.Html;
import src.view.window.Drag;
import src.view.window.Header;
import src.view.window.Navi;
import src.view.window.Style;
import src.view.window.Ability;

class Window {

	private static var _jParent : JQuery;

	/* =======================================================================
		init
	========================================================================== */
	public static function init():Void {

		Html.set();
		Style.set();
		_jParent = new JQuery('#box-window');

		Header.init(_jParent);
		Drag.set(_jParent);
		Navi.init(_jParent);
		Ability.init(_jParent);
		view();

	}

	/* =======================================================================
		View
	========================================================================== */
	private static function view():Void {

		_jParent.css({
			opacity  : 0,
			top      : '70%',
			left     : '50%',
			width    : 50 + "%",
			height   : 50 + "%",
			margin   : "auto",
		});

		_jParent.css({
			marginTop : -_jParent.height()/2,
			marginLeft: -_jParent.width()/2,
		});

		_jParent.animate({
			opacity : 1,
			top     : '50%'
		},300);

	}
}
