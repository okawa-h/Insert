package src.view.window;

import js.JQuery;
import src.view.window.ability.Getter;
import src.view.window.ability.Mail;

class Ability {

	private static var _jParent : JQuery;

	/* =======================================================================
		Init
	========================================================================== */
	public static function init(jParent:JQuery):Void {

		_jParent = jParent;

		Getter.set(_jParent);
		Mail.init(_jParent);

	}

}
