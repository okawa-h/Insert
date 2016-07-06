/*
bookmarklet:
javascript:(function () {
	var s=document.createElement('scr'+'ipt');
	s.charset='UTF-8';
	s.language='javascr'+'ipt';
	s.type='text/javascr'+'ipt';
	s.id='onigiri-scr'+'ipt';
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

		var s = document.createElement('scr'+'ipt');
		s.charset  = 'UTF-8';
		s.language = 'javascr'+'ipt';
		s.type     = 'text/javascr'+'ipt';
		s.id       = 'onigiri-scr'+'ipt';
		s.src      = 'http://192.168.0.68:8888/tokyo/Insert/onigiri.js?t='+(new Date()).getTime();
		document.getElementsByTagName('head')[0].appendChild(s);

	}

	if (typeof jQuery !== "undefined" || typeof jQuery!="undefined"){ 

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

		return false;
	}

	/* =======================================================================
		Set HTML
	========================================================================== */
	function setHtml() {

		var div = document.createElement('div');
		div.id  = "box-window";
		div.innerHTML =
				'<header>' +
					'<p id="close-btn"></p><p id="storage-btn"></p><p id="wide-btn"></p>' +
				'</header>' +
				'<div id="content">' +
					'<nav>' +
						'<ol>' +
							'<li><p id="nav-home" class="active">HOME</p></li>' +
							'<li><p id="nav-about">ABOUT</p></li>' +
							'<li><p id="nav-work">WORK</p></li>' +
							'<li><p id="nav-board">BOARD</p></li>' +
						'</ol>' +
					'</nav>' +
					'<div class="inner">' +
						'<div id="contet-home" class="show contents">' +
							'<p>サイトタイトル : ' + document.title + '</p>' +
							'<p>最終更新日時 : ' + document.lastModified + '</p>' +
							'<p>画像数 : ' + document.images.length + '</p>' +
							'<p>リンク数 : ' + document.links.length + '</p>' +
						'</div>' +
						'<div id="contet-about" class="contents">' +
							'<p id="status-image-size">画像の大きさ : <span>なし</span></p>' +
						'</div>' +
						'<div id="contet-work" class="contents">' +
							'<iframe id="desk-nets" src="http://graphic-tokyo.dn-cloud.com/cgi-bin/dneo/dneo.cgi?" width="100%" height="300px"></iframe>' +
							'<p id="open-secretWindow">シークレットウィンドウで開く</p>' +
							'<p id="mail-auto-reload">Mail自動更新</p>' +
							'<p id="test"><' + '?' + ' php echo 11111; ?' + '></p>' +
						'</div>' +
						'<div id="contet-board" class="contents">' +
							'<div id="board-area">' +
								'<input id="board-input" type="text" name="name" size="30" maxlength="20" ></input>' +
								'<p id="board-write">投稿する</p>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';

		document.body.appendChild(div);

		return false;
	}

	/* =======================================================================
		Set Window
	========================================================================== */
	function setWindow() {

		//alert('<?PHP print $a;?>');
		var a = "<?= $a ?>";
		//var hoge = <?php echo json_encode($hoge); ?>;			

		_$parent.append(a);

		setStyleSheet();
		_$parent.css({
			opacity  : 0,
			top      : '70%',
			left     : '50%',
			width    : 50 + "%",
			height   : 50 + "%",
			margin   : "auto",
		});


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

		setGetActiveMail();
		//setGetDeskNets();
		setBoard();

		return false
	}

			/* =======================================================================
				Set Style Sheet - private
			========================================================================== */
			function setStyleSheet() {

				var style  = document.createElement('link');
				style.rel = "stylesheet";
				style.type = "text/css";
				style.id   = "onigiri-style";
				style.href = "http://192.168.0.68:8888/tokyo/Insert/onigiri/css/style.css";
				document.getElementsByTagName('head').item(0).appendChild(style);

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

				var $nav      = _$parent.find('nav');
				var $contents = _$parent.find('.contents');
				var $btn      = $nav.find('p');

				$btn.on('click',function() {

					var $target = $(this);

					if ($target.hasClass('active')) return;
					$contents.removeClass('show');
					$btn.removeClass('active');
					$target.addClass('active');
					var id = $target.prop('id').split('-')[1];
					$contents.filter('#contet-' + id).addClass('show');

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
						_$parent.add($('#onigiri-style')).remove();
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
						_$parent.find('#content').children().hide();
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
								_$parent.find('#content').children().show();

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
		Set Get Active Mail - Module
	========================================================================== */
	function setGetActiveMail() {

		var href    = window.location.href;
		var $onBtn  = $('#mail-auto-reload');
		var isError = false;

		if (href.indexOf("192.168.90.158/") == -1) isError = true;
		if (!isError) {

			var $iframe   = $('#contentIframe').contents();
			var INTARVAL  = 10000;
			var isOnFocus = true;

			var $parent = $iframe.find('#rmail_list_menu_buttons');
			var $btn    = $parent.find('#_mail_action_button_reload');
			var $folder = $iframe.find('#mail_folder_xtree');
			var $box    = $folder.find('tr[title="受信箱"]').find('.standartTreeRow').find('span');
			var $post   = $('#footer_scroll_contents').find('.news_link');

			var MAILBOX = $box.text();
			var timer;
		}

		$onBtn.on({ 'click':onClick });

		function onClick() {

			if (isError) {

				alert('Active Mailじゃないで。');
				return;

			}

			$onBtn.toggleClass('on');

			if ($onBtn.hasClass('on')) {

				console.log('ActiveMail自動更新開始します。');
				$btn.click();
				timer = setInterval(setTimer,INTARVAL);

			} else {

				console.log('ActiveMail自動更新を止めました。');
				clearInterval(timer);

			}

			function setTimer() {

				$btn.click();
				console.log('更新しました。');
				if (MAILBOX != $box.text()) {

					var length = $box.text().split('受信箱').join('');
					if (length == '（0）') return;

					var $mailBox  = $iframe.find('#divListGrid').find('.objbox');
					var $mailList = $mailBox.find('.obj').find('tbody').find('tr');
					var $firstMail = $mailList.eq(1);
					var $title     = $firstMail.find('td').eq(5).text();
					var $name      = $firstMail.find('td').eq(6).text();
					MAILBOX = $box.text();
					
					console.log($mailList.find('.unseen_mail'));

					var setText = length + "件のメールがあります。\n";
					setText += '件名:' + $title + '\n' + '送信者:' + $name;

					setNotification( 'メール',setText );

				}

			};

		}
	}

	/* =======================================================================
		Set Get Desk Nets - Module
	========================================================================== */
	function setGetDeskNets() {

		var $iframe = _$parent.find('#desk-nets');

		$iframe.on('load',function() {
			alert('load');
			var $html     = $iframe.contents().find('body');
			// var hW        = $html.width();
			// var hH        = $html.height();

			//var $bar = $html.find('#dn-ntwi-container');

			//console.log($bar);
			//$bar.click();

			// $html.css({
			// 	marginTop : -(hH*70)/100 + 'px',
			// 	marginLeft: -(hW*70)/100 + 'px',
			// 	transform : 'scale(.7,.7)',
			// });

		});

		return false;
	}

	/* =======================================================================
		Set Board - Module
	========================================================================== */
	function setBoard() {

		var $parent = _$parent.find('#board-area');
		var $input  = $parent.find('#board-input');
		var $btn    = $parent.find('#board-write');
	 
		ajax('show');
		function ajax(action,val) {

			$.ajax({
				type: 'GET',
				dataType: 'json',
				url : "http://192.168.0.68:8888/tokyo/insert/onigiri/data/board.php?act="+action+"&content="+val,
			})
			.done(function(response) {

				var json = $.parseJSON(response);
				if (json == null) return;

				console.log(json);
				var html = "";

				html += json['name'] + ':' + json['content'];
				$parent.append(html);
			});
      
		}


		$btn.on('click',function() {

			ajax('write',$input.val());

		});

	}


	/* =======================================================================
		Set Notification - Module
	========================================================================== */
	function setNotification(ttl,text) {

		var Notification = window.Notification || window.mozNotification || window.webkitNotification;

		// Notificationの権限チェック
		Notification.requestPermission(function (permission) {
		// console.log(permission);
		});

		// 通知インスタンス生成
		var instance = new Notification(
			ttl,
			{
				body: text, // 通知内容
				icon: "http://192.168.0.68:8888/tokyo/Insert/onigiri/img/icon.png", // アイコン
			}
		);
		setTimeout(instance.close.bind(instance), 5000);

		//instance.config({autoClose: 1000});
		instance.onclick = function () {
			instance.close.bind(instance);
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