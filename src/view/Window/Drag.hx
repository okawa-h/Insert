package src.view.window;

import js.jquery.JQuery;

class Drag {	

	/* =======================================================================
		Set
	========================================================================== */
	public static function set(_jParent:JQuery):Void {

		var jWindow : JQuery = new JQuery('window');

		_jParent.on('mousedown',function(downE:Dynamic) {

			downE.preventDefault();

			var diffY : Float = downE.clientY - Std.parseInt(_jParent.css('top'));
			var diffX : Float = downE.clientX - Std.parseInt(_jParent.css('left'));

			jWindow.on('mousemove',function(moveE:Dynamic) {

				moveE.preventDefault();

				_jParent.css({
					top   : moveE.clientY - diffY + 'px',
					left  : moveE.clientX - diffX + 'px',
					right : "auto",
					bottom: "auto",
				});

				jWindow.on('mouseup',function(upE:Dynamic) {

					untyped jWindow.off('mousemove');

				});
			});
		});

	}

}
