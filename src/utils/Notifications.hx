package src.utils;

import src.utils.Notification;

class Notifications {

	/* =======================================================================
		Say
	========================================================================== */
	public static function say(ttl:String,text:String) {

		untyped var Notification = window.Notification || window.mozNotification || window.webkitNotification;

		// Notificationの権限チェック
		untyped Notification.requestPermission(function (permission) {
		// console.log(permission);
		});

		var instance : Dynamic = new Notification(
			ttl,
			{
				body: text, // 通知内容
				icon: "http://192.168.0.68:8888/tokyo/Insert/onigiri/img/icon.png", // アイコン
			}
		);
		//setTimeout(instance.close.bind(instance), 5000);

		//instance.config({autoClose: 1000});
		untyped instance.onclick = function () {
			instance.close.bind(instance);
			trace("onclick");
		};
		untyped instance.onerror = function () {
			trace("onerror");
		};
		untyped instance.onshow = function () {
			trace("onshow");
		};
		untyped instance.onclose = function () {
			trace("onclose");
		};

	}

}