package src.view.window;

import js.Browser;
import js.html.Element;

class Html {

	/* =======================================================================
		Set
	========================================================================== */
	public static function set():Void {

		var element : Element = Browser.document.createElement('div');
		element.id  = "box-window";
		element.innerHTML =
				'<header>
					<p id="close-btn"></p><p id="storage-btn"></p><p id="wide-btn"></p>
				</header>
				<div id="content">
					<nav>
						<ol>
							<li><p id="nav-home" class="active">HOME</p></li>
							<li><p id="nav-about">ABOUT</p></li>
							<li><p id="nav-work">WORK</p></li>
							<li><p id="nav-board">BOARD</p></li>
						</ol>
					</nav>
					<div class="inner">
						<div id="contet-home" class="show contents">
							<p>サイトタイトル : ' + Browser.document.title + '</p>
							<p>最終更新日時 : ' + Browser.document.lastModified + '</p>
							<p>画像数 : ' + Browser.document.images.length + '</p>
							<p>リンク数 : ' + Browser.document.links.length + '</p>
						</div>
						<div id="contet-about" class="contents">
							<p id="status-image-size">画像の大きさ : <span>なし</span></p>
						</div>
						<div id="contet-work" class="contents">
							<iframe id="desk-nets" src="http://graphic-tokyo.dn-cloud.com/cgi-bin/dneo/dneo.cgi?" width="100%" height="300px"></iframe>
							<p id="open-secretWindow">シークレットウィンドウで開く</p>
							<p id="mail-auto-reload">Mail自動更新</p>
							<p id="test"><' + '?' + ' php echo 11111; ?' + '></p>
						</div>
						<div id="contet-board" class="contents">
							<div id="board-area">
								<input id="board-input" type="text" name="name" size="30" maxlength="20" ></input>
								<p id="board-write">投稿する</p>
							</div>
						</div>
					</div>
				</div>';

		Browser.document.body.appendChild(element);
	}

}
