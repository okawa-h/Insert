package src.view.window;

import js.JQuery;

class Header {

	private static var _jParent : JQuery;
	private static var _jHeader : JQuery;

	/* =======================================================================
		Init
	========================================================================== */
	public static function init(jParent:JQuery):Void {

		_jParent = jParent;
		_jHeader = _jParent.find('header');

		setCloseBtn();

	}

	/* =======================================================================
		Set Close Btn
	========================================================================== */
	private static function setCloseBtn():Void {

		_jHeader.find('#close-btn').on('click',function(event:JqEvent) {

			_jParent.animate({
				opacity : 0,
				top     : Std.parseInt(_jParent.css('top')) + 50 + 'px'
			},100, function() {
				_jParent.add(new JQuery('#onigiri-style')).remove();
			});

		});

	}

	/* =======================================================================
		Set Storage Btn
	========================================================================== */
	private static function setStorageBtn():Void {

		_jHeader.find('#storage-btn').on('click',function(event:JqEvent) {

			_jParent.css({ cursor:'pointer' }).addClass('onStorage');

			_jParent.animate({
				width : 100 + 'px',
				height: 50 + 'px',
				top   : 90 + '%',
				left  : 90 + '%',
			},100, function() {

				_jHeader.children().hide();
				_jParent.find('#content').children().hide();
				_jParent.on('dblclick',function(dbEvent:JqEvent) {

					_jParent.animate({
						top    : 50 + '%',
						left   : 50 + '%',
						width  : 50 + "%",
						height : 50 + "%"
					},200,function() {

						untyped _jParent.off('click');

						_jParent.css({ cursor:'default'}).removeClass('onStorage');
						_jHeader.children().show();
						_jParent.find('#content').children().show();

					});

				});

			});
		});

	}

	/* =======================================================================
		Set Wide Btn
	========================================================================== */
	private static function setWideBtn():Void {

		var jBtn = _jHeader.find('#wide-btn');

		jBtn.on('click',function(event:JqEvent) {

			jBtn.toggleClass('on');

			if (!jBtn.hasClass('on')) {

				var marginTop  = -(_jParent.height()/2)/2;
				var marginLeft = -(_jParent.width()/2)/2;

				_jParent.animate({
					top    : 50 + '%',
					left   : 50 + '%',
					width  : 50 + "%",
					height : 50 + "%",
					marginTop : marginTop,
					marginLeft: marginLeft
				},200);

			} else {

				_jParent.animate({
					top    : 0,
					left   : 0,
					width  : 100 + '%',
					height : 100 + '%',
					marginTop : 0,
					marginLeft: 0
				},200);

			}
		});

	}

}
