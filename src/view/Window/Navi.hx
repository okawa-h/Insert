package src.view.window;

import js.JQuery;

class Navi {

	private static var _jParent : JQuery;

	/* =======================================================================
		Init
	========================================================================== */
	public static function init(jParent:JQuery):Void {

		_jParent = jParent;

		var jNav      = jParent.find('nav');
		var jContents = jParent.find('.contents');
		var jBtn      = jNav.find('p');

		jBtn.on('click',function(event:JqEvent) {

			var jTarget : JQuery = JQuery.cur;

			if (jTarget.hasClass('active')) return;
			jContents.removeClass('show');
			jBtn.removeClass('active');
			jTarget.addClass('active');
			var id : String = jTarget.prop('id').split('-')[1];
			jContents.filter('#contet-' + id).addClass('show');

		});

	}

}
