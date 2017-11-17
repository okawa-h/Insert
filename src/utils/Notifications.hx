package src.utils;

import js.html.Notification;
import js.html.NotificationPermission;
import js.html.NotificationOptions;

class Notifications {

	/* =======================================================================
		Say
	========================================================================== */
	public static function say(ttl:String,text:String) {

		var options : NotificationOptions = {
			body : text,
			icon : 'http://192.168.0.134:8888/tokyo/browser-insert/onigiri/img/icon.png'
		};

		var notify : Notification = new Notification(ttl,options);
		notify.onclick = function () {
			notify.close();
		};

	}

}