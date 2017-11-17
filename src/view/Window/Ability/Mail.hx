package src.view.window.ability;

import haxe.Timer;
import js.jquery.JQuery;
import js.jquery.Event;
import src.utils.Notifications;

class Mail {

	private static var _jParent : JQuery;
	private static var _jBtn    : JQuery;
	private static var _timer   : Timer;

	/* =======================================================================
		Init
	========================================================================== */
	public static function init(jParent:JQuery):Void {

		_jParent = jParent;

		var jWindow : JQuery = new JQuery('window');
		var href    : String = untyped jWindow.location.href;

		_jBtn = new JQuery('#mail-auto-reload');

		if (href.indexOf("192.168.90.158/") == -1) {

			return;

		} else {

			set();

		}

	}

	/* =======================================================================
		Set
	========================================================================== */
	private static function set():Void {

		var isOnFocus = true;

		_jBtn.on('click',function(event:Event) {

			onClick();

		});

	}

	/* =======================================================================
		On Click
	========================================================================== */
	private static function onClick():Void {

		_jBtn.toggleClass('on');

		if (_jBtn.hasClass('on')) {

			trace('ActiveMail自動更新開始します。');

			var jIframe   = new JQuery('#contentIframe').contents();
			var jMenubtns = jIframe.find('#rmail_list_menu_buttons');
			var jReloadBtn = jMenubtns.find('#_mail_action_button_reload');
			var jFolder = jIframe.find('#mail_folder_xtree');
			var jBox    = jFolder.find('tr[title="受信箱"]').find('.standartTreeRow').find('span');
			var jPost   = new JQuery('#footer_scroll_contents').find('.news_link');

			jReloadBtn.click();
			var INTARVAL  = 10000;
			var MAILBOX = jBox.text();

			_timer = new Timer(INTARVAL);
			_timer.run = function() {
				setTimer(jReloadBtn,MAILBOX,jBox,jIframe);
			};

		} else {

			trace('ActiveMail自動更新を止めました。');
			_timer.stop();

		}

	}

	/* =======================================================================
		Set Timer
	========================================================================== */
	private static function setTimer(jReloadBtn:JQuery,MAILBOX:String,jBox:JQuery,jIframe:JQuery) {

		jReloadBtn.click();
		trace('更新しました。');
		if (MAILBOX != jBox.text()) {

			var length = jBox.text().split('受信箱').join('');
			if (length == '（0）') return;

			var jMailBox  = jIframe.find('#divListGrid').find('.objbox');
			var jMailList = jMailBox.find('.obj').find('tbody').find('tr');
			var jFirstMail = jMailList.eq(1);
			var title     = jFirstMail.find('td').eq(5).text();
			var name      = jFirstMail.find('td').eq(6).text();
			MAILBOX = jBox.text();
			
			trace(jMailList.find('.unseen_mail'));

			var setText = length + "件のメールがあります。\n";
			setText += '件名:' + title + '\n' + '送信者:' + name;

			Notifications.say( 'メール',setText );

		}

	};

}
