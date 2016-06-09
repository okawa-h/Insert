/*
bookmarklet:
javascript:(function () {
	var s=document.createElement('scr'+'ipt');
	s.charset='UTF-8';
	s.language='javascr'+'ipt';
	s.type='text/javascr'+'ipt';
	s.src='http://192.168.0.68:8888/tokyo/api/hack.js?t='+(new Date()).getTime();
	document.getElementsByTagName('head')[0].appendChild(s);
})();
*/
(function () {

	/* =======================================================================
		Start Judge
	========================================================================== */
	if (!$) {

		alert("JQueryがありません。");
		return;
	}

	if ('undefined' == typeof performance || !performance.timing) {

		alert("このブラウザではperformance.timingがサポートされていないため、このスクリプトを利用しての速度チェックはできません。別のブラウザで試してください。");
		return;
	}

	if (document.readyState !== 'complete') {

		alert('ブラウザが処理中です。動作が完了してから（読み込み中止ボタンがリロードボタンに変わってから）再度ブックマークレットを実行してください。');
		return;
	}

	if ($('#box-window').length > 0) {

		alert('実行済みです。');
		return;
	}

	/* =======================================================================
		Init
	========================================================================== */

	var _$win,_$parent;

	(function init() {

		setHtml();
		_$win    = $(window);
		_$parent = $('#box-window');
		setWindow();

		return false;
	})();

	/* =======================================================================
		Set HTML
	========================================================================== */
	function setHtml() {

		var html = 
			'<div id="box-window">'
				+ '<header class="">'
					+ '<p id="close-btn"></p><p id="storage-btn"></p><p id="wide-btn"></p>'
				+ '</header>'
				+ '<div class="inner">'
					+ '<p>画像数:' + document.images.length + '</p>'
					+ '<p>リンク数:' + document.links.length + '</p>'
					+ '<p id="status-image-size">画像の大きさ:<span>なし</span></p>'
				+ '</div>'
			 + '</div>';

		$('body').append(html);

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

				var newStyle  = document.createElement('style');
				newStyle.type = "text/css";
				newStyle.id   = "box-window-style";
				document.getElementsByTagName('head').item(0).appendChild(newStyle);

				var rules = "";
				rules += "#box-window { position:fixed; border-radius:10px; background-color:rgba(230,230,230,.9); z-index:100000; } ";
				rules += "#box-window.onStorage:hover { opacity:.8 !important; } ";
				rules += "#box-window header { padding:4px 10px 6px; border-top-left-radius:10px; border-top-right-radius:10px; background-color:#fff; } ";
				rules += "#box-window header p { display:inline-block; margin-right:5px; border-radius:50%; width:10px; height:10px; cursor:pointer; } ";
				rules += "#box-window header #close-btn { background-color:#d3565c; } ";
				rules += "#box-window header #storage-btn { background-color:#f6da56; } ";
				rules += "#box-window header #wide-btn { background-color:#68b46c; } ";;
				rules += "#box-window .inner { padding:20px; } ";

				$('#box-window-style').html(rules);

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

				_$parent.find('#storage-btn').on('click',function() {

					_$parent.css({ cursor:'pointer' }).addClass('onStorage');

					_$parent.animate({
						width : 100 + 'px',
						height: 50 + 'px',
						top   : 90 + '%',
						left  : 90 + '%',
					},100, function() {

						_$parent.find('header').children().hide();
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
								_$parent.find('header').children().show();
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

				var $btn = _$parent.find('#wide-btn');

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
})();