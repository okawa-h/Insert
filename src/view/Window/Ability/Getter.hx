package src.view.window.ability;

import js.JQuery;

class Getter {

	private static var _jParent : JQuery;

	/* =======================================================================
		Set
	========================================================================== */
	public static function set(jParent:JQuery):Void {

		_jParent = jParent;
		setOnMouseGetState();

	}

	/* =======================================================================
		Set
	========================================================================== */
	private static function setOnMouseGetState():Void {

		var jImageSizeText : JQuery = _jParent.find('#status-image-size').find('span');

		new JQuery("img").on('mouseover',function(event:JqEvent) {

			var jTarget : JQuery = JQuery.cur;

			var status : String = "width:" + jTarget.width() + ";";
			status += "height:" + jTarget.height() + ";";
			jImageSizeText.html(status);

		});

	}

}
