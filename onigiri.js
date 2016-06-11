/*
bookmarklet:
javascript:(function () {
	var s=document.createElement('scr'+'ipt');
	s.charset='UTF-8';
	s.language='javascr'+'ipt';
	s.type='text/javascr'+'ipt';
	s.id='onigiri-script';
	s.src='http://192.168.0.68:8888/tokyo/Insert/onigiri.js?t='+(new Date()).getTime();
	document.getElementsByTagName('head')[0].appendChild(s);
})();
*/
(function () {

	/* =======================================================================
		Start Judge
	========================================================================== */

	if ('undefined' == typeof performance || !performance.timing) {

		alert("このブラウザではperformance.timingがサポートされていないため、このスクリプトを利用しての速度チェックはできません。別のブラウザで試してください。");
		return;
	}

	if (document.readyState !== 'complete') {

		alert('ブラウザが処理中です。動作が完了してから（読み込み中止ボタンがリロードボタンに変わってから）再度ブックマークレットを実行してください。');
		return;
	}

	if (!document.getElementById('box-window') == null) {

		alert('実行済みです。');
		return;
	}

	if (typeof jQuery === "undefined" || typeof $ === "undefined") {

		loadJQuery();
		console.log("jQueryが読み込まれていなかったので、読み込みました。");

		var script = document.getElementById('onigiri-script');
		script.parentNode.removeChild(script);

		var s=document.createElement('scr'+'ipt');
		s.charset='UTF-8';
		s.language='javascr'+'ipt';
		s.type='text/javascr'+'ipt';
		s.id='onigiri-script';
		s.src='http://192.168.0.68:8888/tokyo/Insert/onigiri.js?t='+(new Date()).getTime();
		document.getElementsByTagName('head')[0].appendChild(s);

	}

	if(typeof jQuery !== "undefined"){ 

		//alert("jQueryは読込まれています。");
		init();

	} else if (typeof jQuery!="undefined"){

		//alert("jQueryは読込まれています。typeof jQuery="+typeof jQuery);
		init();

	}

	/* =======================================================================
		Load JQuery
	========================================================================== */
	function loadJQuery() {

		var onigiriScript = document.getElementById('onigiri-script');
		var script  = document.createElement('script');
		script.type = "text/javascript";
		script.id   = "box-window-JQuery";
		script.src  = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js";

		onigiriScript.parentNode.insertBefore(script,onigiriScript)

	}

	/* =======================================================================
		Init
	========================================================================== */

	var _$win,_$parent,_$header;

	function init() {

		setHtml();
		_$win    = $(window);
		_$parent = $('#box-window');
		_$header = _$parent.find('header');
		setWindow();

		setGetActiveMail();

		return false;
	}

	/* =======================================================================
		Set HTML
	========================================================================== */
	function setHtml() {

		var div = document.createElement('div');
		div.id  = "box-window";
		div.innerHTML =
				'<header>'
					+ '<p id="close-btn"></p><p id="storage-btn"></p><p id="wide-btn"></p>'
				+ '</header>'
				+ '<div id="content">'
					+ '<nav>'
						+ '<ol>'
							+ '<li><p id="nav-home" class="active">HOME</p></li>'
							+ '<li><p id="nav-about">ABOUT</p></li>'
							+ '<li><p id="nav-work">WORK</p></li>'
						+ '</ol>'
					+ '</nav>'
					+ '<div class="inner">'
						+ '<p>サイトタイトル : ' + document.title + '</p>'
						+ '<p>最終更新日時 : ' + document.lastModified + '</p>'
						+ '<p>画像数 : ' + document.images.length + '</p>'
						+ '<p>リンク数 : ' + document.links.length + '</p>'
						+ '<p id="status-image-size">画像の大きさ : <span>なし</span></p>'
					+ '</div>'
				+ '</div>';

		document.body.appendChild(div);

		return false;
	}

	/* =======================================================================
		Set Window
	========================================================================== */
	function setWindow() {

		_$parent.css({
			opacity  : 0,
			top      : '70%',
			left     : '50%',
			width    : 50 + "%",
			height   : 50 + "%",
			margin   : "auto",
		});

		setStyleSheet();

		_$parent.css({
			marginTop : -_$parent.height()/2,
			marginLeft: -_$parent.width()/2,
		});

		_$parent.animate({
			opacity : 1,
			top     : '50%'
		},300);

		setMouseMoveObj(_$parent);
		setNav();
		setCloseBtn();
		setStorageBtn();
		setWideBtn();
		setOnMouseGetState();

		return false
	}

			/* =======================================================================
				Set Style Sheet - private
			========================================================================== */
			function setStyleSheet() {

				var style  = document.createElement('style');
				style.type = "text/css";
				style.id   = "box-window-style";
				document.getElementsByTagName('head').item(0).appendChild(style);

				document.getElementById('box-window-style').innerHTML =
				"#box-window { position:fixed; border-radius:10px; background-color:rgba(230,230,230,.9); z-index:100000; } " +
				"#box-window.onStorage:hover { opacity:.8 !important; } " +
				"#box-window header { padding:4px 10px 6px; border-top-left-radius:10px; border-top-right-radius:10px; background-color:#fff; } " +
				"#box-window header p { display:inline-block; margin-right:5px; border-radius:50%; width:10px; height:10px; cursor:pointer; } " +
				"#box-window header #close-btn { background-color:#d3565c; } " +
				"#box-window header #storage-btn { background-color:#f6da56; } " +
				"#box-window header #wide-btn { background-color:#68b46c; } " +
				"#box-window .inner { margin: 20px 20px 20px 20%; } " +
				"#box-window nav { float:left; width:16%; padding:0 2% 0 0; } " +
				"#box-window nav ol { } " +
				"#box-window nav ol li {  } " +
				"#box-window nav ol li p { padding:5px 0; border-left:5px solid #bbb; font-size:12px; text-align:center; cursor:pointer; } " +
				"#box-window nav ol li p.active { color:#fff; } " +
				"#box-window nav ol li #nav-home { border-left-color:#f6da56; } " +
				"#box-window nav ol li #nav-home.active { background-color:#f6da56; } " +
				"#box-window nav ol li #nav-about { border-left-color:#d3565c; } " +
				"#box-window nav ol li #nav-about.active { background-color:#d3565c; } " +
				"#box-window nav ol li #nav-work { border-left-color:#68b46c; } " +
				"#box-window nav ol li #nav-work.active { background-color:#68b46c; } ";

				return false;
			}

			/* =======================================================================
				Set Mouse Move Obj - private
			========================================================================== */
			function setMouseMoveObj($target) {

				$target.on('mousedown',function(downE) {

					downE.preventDefault();

					var diffY = downE.clientY - parseInt($target.css('top'));
					var diffX = downE.clientX - parseInt($target.css('left'));

					_$win.on('mousemove',function(moveE) {

						moveE.preventDefault();

						$target.css({
							top   : moveE.clientY - diffY + 'px',
							left  : moveE.clientX - diffX + 'px',
							right : "auto",
							bottom: "auto",
						});

						_$win.on('mouseup',function(upE) {

							_$win.off('mousemove');

						});
					});
				});

				return false;
			}

			/* =======================================================================
				Set Nav - private
			========================================================================== */
			function setNav() {

				var $nav = _$parent.find('nav');
				var $btn = $nav.find('p');

				$btn.on('click',function() {

					if ($(this).hasClass('active')) return;
					$btn.removeClass('active');
					$(this).addClass('active');

				});

				return false;
			}

			/* =======================================================================
				Set Close Btn - private
			========================================================================== */
			function setCloseBtn() {

				_$parent.find('#close-btn').on('click',function() {

					_$parent.animate({
						opacity : 0,
						top     : parseInt(_$parent.css('top')) + 50 + 'px'
					},100, function() {
						_$parent.add($('#box-window-style')).remove();
					});
				});

				return false;
			}

			/* =======================================================================
				Set Storage Btn - private
			========================================================================== */
			function setStorageBtn() {

				var $btn = _$header.find('#storage-btn');

				$btn.on('click',function() {

					_$parent.css({ cursor:'pointer' }).addClass('onStorage');

					_$parent.animate({
						width : 100 + 'px',
						height: 50 + 'px',
						top   : 90 + '%',
						left  : 90 + '%',
					},100, function() {

						_$header.children().hide();
						_$parent.find('.inner').children().hide();
						_$parent.on('dblclick',function() {

							_$parent.animate({
								top    : 50 + '%',
								left   : 50 + '%',
								width  : 50 + "%",
								height : 50 + "%"
							},200,function() {

								_$parent.off('click');

								_$parent.css({ cursor:'default'}).removeClass('onStorage');
								_$header.children().show();
								_$parent.find('.inner').children().show();

							});

						});

					});
				});

				return false;
			}

			/* =======================================================================
				Set Wide Btn - private
			========================================================================== */
			function setWideBtn() {

				var $btn = _$header.find('#wide-btn');

				$btn.on('click',function() {

					$btn.toggleClass('on');

					if (!$btn.hasClass('on')) {

						var marginTop  = -(_$parent.height()/2)/2;
						var marginLeft = -(_$parent.width()/2)/2;

						_$parent.animate({
							top    : 50 + '%',
							left   : 50 + '%',
							width  : 50 + "%",
							height : 50 + "%",
							marginTop : marginTop,
							marginLeft: marginLeft
						},200);

					} else {

						_$parent.animate({
							top    : 0,
							left   : 0,
							width  : 100 + '%',
							height : 100 + '%',
							marginTop : 0,
							marginLeft: 0
						},200);

					}
				});

				return false;
			}

			/* =======================================================================
				Set Close Btn - private
			========================================================================== */
			function setOnMouseGetState() {

				var $imageSizeText = _$parent.find('#status-image-size').find('span');

				$("img").on('mouseover',function() {

					var status = "width:" + $(this).width() + ";";
					status += "height:" + $(this).height() + ";";
					$imageSizeText.html(status);

				});

				return false;
			}

	/* =======================================================================
		Set Get Active Mail - private
	========================================================================== */
	function setGetActiveMail() {

		var href = window.location.href;
		if (href.indexOf("192.168.90.158/") == -1) return;

		console.log('ActiveMail自動更新開始します。');

		var $iframe   = $('#contentIframe').contents();
		var $body     = $('body');
		var INTARVAL  = 1000;
		var isOnFocus = true;

		var $parent = $iframe.find('#rmail_list_menu_buttons');
		var $btn    = $parent.find('#_mail_action_button_reload');
		var $folder = $iframe.find('#mail_folder_xtree');
		var $box    = $folder.find('tr[title="受信箱"]').find('.standartTreeRow').find('span');
		var $post   = $('#footer_scroll_contents').find('.news_link');

		var MAILBOX = $box.text();
		var timer;

		_$win.bind('focus',function() {

			clearInterval(timer);
			console.log('focus');

		}).bind('blur',function() {

			timer = setInterval(setTimer,1000);
			console.log('blur');

		});

		function setTimer() {

			$btn.click();
			console.log('hatudou');
			if (MAILBOX != $box.text()) {
				MAILBOX = $box.text();
				setNotification($box.text().split('受信箱').join('') + "件のメールがあります。");
			}

		};

	}


	/* =======================================================================
		Set Notification
	========================================================================== */
	function setNotification(text) {

		var Notification = window.Notification || window.mozNotification || window.webkitNotification;

		// Notificationの権限チェック
		Notification.requestPermission(function (permission) {
		// console.log(permission);
		});

		// 通知インスタンス生成
		var instance = new Notification(
		"お知らせタイトル", // 通知タイトル
			{
				body: text, // 通知内容
				icon: "http://192.168.0.68:8888/tokyo/Insert/onigiri/img/icon.png", // アイコン
			}
		);

		//instance.config({autoClose: 1000});
		instance.onclick = function () {
			console.log("onclick");
		};
		instance.onerror = function () {
			console.log("onerror");
		};
		instance.onshow = function () {
			console.log("onshow");
		};
		instance.onclose = function () {
			console.log("onclose");
		};
	}




	function setCatchImage() {
		$("a").on('mousedown',function(e) {
			e.preventDefault();
		});
		$("img").on('mousedown',function(downE) {

			$target = $(this);

			downE.preventDefault();

			var height = $target.height();
			var width = $target.width();
			var diffY = downE.clientY - parseInt($target.css('top'));
			var diffX = downE.clientX - parseInt($target.css('left'));

			$target.css({
				top      : downE.clientY - diffY + 'px',
				left     : downE.clientX - diffX + 'px',
				position : "fixed",
				width    : width,
				height   : height
			});

			_$win.on('mousemove',function(moveE) {

				moveE.preventDefault();

				$target.css({
					top  : moveE.clientY - diffY + 'px',
					left : moveE.clientX - diffX + 'px'
				});

				_$win.on('mouseup',function(upE) {

					_$win.off('mousemove');

				});
			});
		});
	}
})();