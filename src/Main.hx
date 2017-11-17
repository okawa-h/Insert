/**
* ================================================================================
*
* Portfolio ver 1.00.00
*
* Author : HIROKI OKAWA
* Since  : 2015/12/16
* Update : 2016/05/25
*
* Licensed under the MIT License
* Copyright (c) Hiroki Okawa
*
* ================================================================================
*
**/
package src;

import haxe.Timer;
import js.JQuery;
import src.utils.Check;
import src.view.Window;

class Main {

	/* =======================================================================
		Main
	========================================================================== */
	public static function main():Void {

		check();

	}

	/* =======================================================================
		Check
	========================================================================== */
	private static function check():Void {

		var judge : Bool = Check.init();
		if (!judge) return;

		init();


	}

	/* =======================================================================
		Init
	========================================================================== */
	private static function init():Void {

		Window.init();


	}

}
