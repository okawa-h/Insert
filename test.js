/*
bookmarklet:
javascript:(function () {
  var s=document.createElement('scr'+'ipt');
  s.charset='UTF-8';
  s.language='javascr'+'ipt';
  s.type='text/javascr'+'ipt';
  s.src='http://192.168.0.68:8888/tokyo/api/test.js?t='+(new Date()).getTime();
  document.getElementsByTagName('head')[0].appendChild(s);
})();
*/
(function () {

  var str = 
    '画像数:' + document.images.length +
    'リンク数:' + document.links.length;

  alert(str);


  if ('undefined' == typeof performance || !performance.timing) {
    alert("このブラウザではperformance.timingがサポートされていないため、このスクリプトを利用しての速度チェックはできません。別のブラウザで試してください。");
    return;
  }

  if (document.readyState !== 'complete') {
    alert('ブラウザが処理中です。動作が完了してから（読み込み中止ボタンがリロードボタンに変わってから）再度ブックマークレットを実行してください。');
    return;
  }

  // 表示するコンテンツ
  var msg = '';

  // 時刻計算の一時保存用（あとでnavigationStartに置き換える
  var startTime = 0;

  // timing情報保存用
  var timings = [];

  // 標準の項目と順番
  var referenceObj = [
    {
      name: 'navigationStart',
      desc:'ブラウザがページ表示のための動作を開始した時刻（前に表示していたページがある場合、その<a href="http://www.w3.org/TR/html5/browsers.html#prompt-to-unload-a-document">アンロードのための一連の動作</a>が完了した時刻）'
    },
    {
      name: 'unloadEventStart',
      desc:'前に表示していたページが同一オリジンの場合、前のページのアンロードを開始した時刻（前に表示していたページがないか別オリジンの場合はゼロ、また、リダイレクト処理があってそのすべてが同一オリジンではない場合はゼロ）'
    },
    {
      name: 'unloadEventEnd',
      desc:'前に表示していたページのアンロードイベントの終了時刻（unloadEventStartがゼロの場合はゼロ）'
    },
    {
      name: 'redirectStart',
      desc:'ページ表示までにリダイレクトがあり、そのすべてが同一オリジンからの場合、そのリダイレクト処理の開始時刻（リダイレクトがなければゼロ）'
     },
    {
      name: 'redirectEnd',
      desc:'リダイレクト修了時刻（redirectStartがゼロの場合はゼロ）'
    },
    {
      name: 'fetchStart',
      desc:'ページ表示のためにブラウザが情報取得を開始した時刻（キャッシュを含む）'
    },
    {
      name: 'domainLookupStart',
      desc:'ページのためのDNS参照を開始した時刻（Webサーバーと持続接続している場合と、キャッシュから取得した場合は、fetchStartと同一時刻）'
    },
    {
      name: 'domainLookupEnd',
      desc:'ページのためのDNS参照を修了した時刻（Webサーバーと持続接続している場合と、キャッシュから取得した場合は、fetchStartと同一時刻）'
    },
    {
      name: 'connectStart',
      desc:'ページデータ取得のためにWebサーバーにTCP接続し始めた時刻（Webサーバーと持続接続している場合と、キャッシュから取得した場合は、domainLookupEndと同一時刻）'
    },
    {
      name: 'secureConnectionStart',
      desc:'（オプション）HTTPS接続が使われた場合、SSLハンドシェイクの開始時刻（HTTPSでない場合はゼロ）'
    },
    {
      name: 'connectEnd',
      desc:'WebサーバーとのTCP接続を確立した時刻（SSLハンドシェイクやSOCKS認証なども含む）（Webサーバーと持続接続している場合と、キャッシュから取得した場合は、domainLookupEndと同一時刻）'
    },
    {
      name: 'requestStart',
      desc:'Webサーバー（またはキャッシュ）に対してページ情報をリクエスト開始した時刻'
    },
    {
      name: 'responseStart',
      desc:'ページのリクエストに対するレスポンスの1バイト目をブラウザがWebサーバー（またはキャッシュ）から受け取った時刻'
    },
    {
      name: 'responseEnd',
      desc:'ページのリクエストに対するレスポンスをすべてブラウザがWebサーバー（またはキャッシュ）から受け取った時刻（またはトランスポート接続が閉じられた時刻）'
    },
    {
      name: 'domLoading',
      desc:'ページのHTMLをブラウザが読み込み開始した時刻（DOMオブジェクトが作られて<a href="http://www.w3.org/TR/html5/dom.html#current-document-readiness">document.readyStateが"loading"にセット</a>された時刻）'
    },
    {
      name: 'domInteractive',
      desc:'ブラウザがページのHTMLを読み込んでパース完了し、サブリソース（画像など参照されている要素）を読み込み始めた時刻（<a href="http://www.w3.org/TR/html5/dom.html#current-document-readiness">document.readyStateが"interactive"にセット</a>された時刻）'
    },
    {
      name: 'domContentLoadedEventStart',
      desc:'ブラウザがDOMの構築を完了しDOMCOntentLoadedイベント（jQueryでいう$(document).readyイベント）を開始した時刻'
    },
    {
      name: 'domContentLoadedEventEnd',
      desc:'DOMCOntentLoadedイベントが終了した時刻'
    },
    {
      name: 'domComplete',
      desc:'ブラウザがDOMの構築を完了した時刻（<a href="http://www.w3.org/TR/html5/syntax.html#the-end">document.readyStateが"complete"にセット</a>された時刻）'
    },
    {
      name: 'loadEventStart',
      desc:'loadイベントが開始された時刻（loadイベントがまだ実行されていない場合はゼロ）'
    },
    {
      name: 'loadEventEnd',
      desc:'loadイベントが修了した時刻（loadイベントがまだ実行されない場合や完了していない場合はゼロ）'
    },
  ];

  // referenceObjの情報を参考に並べ替え番号または解説を返す
  var getTimingInfo = function (name, type) {
    var val = null;
    for (var sKey in referenceObj) {
      if (sKey && referenceObj[sKey]['name'] === name) {
        val = sKey;
      }
    }
    switch (type) {
    // referenceObjから解説を返す
    case 'desc':
      return val === null ? '' : referenceObj[val]['desc'];
      break;
    // timingsからその情報が入っている添え字（キー）を返す
    case 'keyOfTimings':
      var keyOfTimings = null;
      for (var sKey in timings) {
        if (sKey && name == timings[sKey].key) {
          keyOfTimings = sKey;
          break;
        }
      }
      return keyOfTimings;
      break;
    // referenceObjから並べ替え番号を返す
    case 'sortKey':
    default:
      return val === null ? 999 : val;
    }
  };

  // バー表示のサイズなど情報を返す（このあとのifOutputInfoでも使ってる）
  var getNavMetric = function (type, a, b) {
    switch (type) {
    case 'val':
      for (var sKey in timings) {
        if (!sKey) {
          continue;
        }
        else {
          if (timings[sKey].key === a) {
            return timings[sKey].val;
          }
        }
      }
      return 0;
      break;
    case 'left':
      return Math.round((getNavMetric('val', a) - dat.startTime) / dat.total * 1000)/10;
      break;
    case 'width':
      return Math.round((getNavMetric('val', b) - getNavMetric('val', a)) / dat.total * 1000)/10;
      break;
    }
  }

  // バー表示のHTMLを返す
  var getNavHTML = function (startName, endName, title, classAppendix) {
    if (getNavMetric('width', startName, endName) > 5) {
      var s = '<div class="webtanNavtimeBar webtanNavtimeBar' + classAppendix + '" style="left: ' + getNavMetric('left', startName) + '%; top: ' + barYOffset + 'em; width: ' + getNavMetric('width', startName, endName) + '%"><div class="webtanNavtimeBarInner"></div></div><div class="webtanNavtimeBarCaption" style="top: ' + barYOffset + 'em;' + ((getNavMetric('left', startName) > 66) ? ('text-align: right; right: ' + Math.abs(Math.round(100 - parseFloat(getNavMetric('left', startName)) - parseFloat(getNavMetric('width', startName, endName)))) + '%; padding-right: 5px')  : ('left: ' + getNavMetric('left', startName) + '%; padding-left: 3px')) + '">' + title + '</div>';

      barYOffset = barYOffset + 1.5;
      return s;
    }
    else {
      return '';
    }
  }

  // 特定の項目を表示するかどうかの判断
  var ifOutputInfo = function (name, criteria) {
    var criteriaVal = criteria || 5;
    switch (name) {
    case 'client_beforeDNS':
      return (getTimingInfo('domainLookupStart', 'keyOfTimings') && timings[getTimingInfo('domainLookupStart', 'keyOfTimings')-1] && getNavMetric('width', timings[getTimingInfo('domainLookupStart', 'keyOfTimings')-1].key, 'domainLookupStart') > criteriaVal);
      break;
    
    case 'client_afterDNS':
      return (performance.timing.connectStart > performance.timing.domainLookupEnd && getNavMetric('width', 'domainLookupEnd', 'connectStart') > criteriaVal);
      break;
      
    case 'client_init':
      return (performance.timing.connectEnd === performance.timing.fetchStart && getNavMetric('width', 'domainLookupEnd', 'requestStart') > criteriaVal);
      break;
    
    case 'server_connect_ssl':
      return (performance.timing.secureConnectionStart);
      break;
    }
  }


  for (var skey in performance.timing){
    if (! isNaN(performance.timing[skey]) ){
      timings.push({'key': skey, 'val': performance.timing[skey]});
      if (skey === 'navigationStart'){
        startTime = performance.timing[skey];
      }
    }
  }
  // performance.timingの時刻とreferenceObjの順序を参考に並べ替え
  // unloadのタイミングとかがなんか仕様と違う場合があるので時刻優先
  timings.sort(function (a, b) {
    if (a['val'] !== b['val']) {
    return (a['val'] - b['val']);
    }
    else {
      return (getTimingInfo(a.key) - getTimingInfo(b.key));
    }
  });


  var dat = {breakdown: {}, total: 0, startTime: 0, endTime: 0};
  
  dat.total = performance.timing.loadEventEnd - performance.timing.navigationStart;
  dat.startTime = performance.timing.navigationStart;
  dat.endTime = performance.timing.loadEventEnd || performance.timing.domComplete;

  dat.breakdown.redirect = {
    val: performance.timing.redirectStart ? performance.timing.fetchStart - performance.timing.redirectStart : 0,
    formula: 'redirectStart ～ fetchStart',
    criteria: 150,
    title: 'リダイレクト処理',
    desc: 'ここが長い場合、不要なリダイレクトを減らすか、サーバーのリダイレクト処理を高速化しましょう。'
  };

  // ブラウザによっておかしなとこで待ち時間があるのの検出
  if (ifOutputInfo('client_beforeDNS', 1)) {
    dat.breakdown.client_beforeDNS = {
      val: performance.timing.domainLookupStart - timings[getTimingInfo('domainLookupStart', 'keyOfTimings')-1].val,
      formula: timings[getTimingInfo('domainLookupStart', 'keyOfTimings')-1].key + ' ～ domainLookupStart',
      criteria: 500,
      title: 'DNS参照前のリクエスト準備',
      desc: 'ここが長い場合、ブラウザが何かしています。理由はわかりません。'
    };
  }

  dat.breakdown.dns = {
    val: performance.timing.domainLookupEnd - performance.timing.domainLookupStart,
    formula: 'domainLookupStart ～ domainLookupEnd',
    criteria: 150,
    title: 'DNS処理',
    desc: 'ここが長い場合、DNSサーバーを性能の良いものにしましょう。'
  };

  // ブラウザによっておかしなとこで待ち時間があるのの検出
  if (ifOutputInfo('client_afterDNS', 1)) {
    dat.breakdown.client_afterDNS = {
      val: performance.timing.connectStart - performance.timing.domainLookupEnd,
      formula: 'domainLookupEnd ～ connectStart',
      criteria: 500,
      title: 'DNS参照後の接続準備',
      desc: 'ここが長い場合、ブラウザが何かしています。理由はわかりません。'
    };
  }

  // ブラウザによっておかしなとこで待ち時間があるのの検出
  if (ifOutputInfo('client_init', 1)) {
    dat.breakdown.client_init = {
      val: performance.timing.requestStart - performance.timing.domainLookupEnd,
      formula: 'domainLookupEnd ～ requestStart',
      criteria: 500,
      title: 'DNS参照後のリクエスト準備',
      desc: 'ここが長い場合、ブラウザが何かしています。理由はわかりません。'
    };
  }

  if (ifOutputInfo('server_connect_ssl')) {
    dat.breakdown.server_connect_ssl = {
      val: performance.timing.connectEnd - performance.timing.connectStart,
      formula: 'connectStart ～ connectEnd',
      criteria: 150,
      title: 'Webサーバーの接続受付（SSL）',
      desc: 'ここが長い場合、Webサーバー（CMS）のサーバー側での接続待ち受け準備が不足している場合があります。サーバー管理者と相談しましょう。'
    };

    dat.breakdown.ssl = {
      val: performance.timing.connectEnd - performance.timing.secureConnectionStart,
      formula: 'secureConnectionStart ～ connectEnd',
      criteria: 150,
      title: 'SSL接続処理',
      desc: 'ここが長い場合、SSLサーバー証明書の確認やその取り消し確認処理、または、Webサーバー側でのSSL接続の待ち受けに時間がかかっています。'
    };
  }
  else {
    dat.breakdown.server_connect = {
      val: performance.timing.connectEnd - performance.timing.connectStart,
      formula: 'connectStart ～ connectEnd',
      criteria: 150,
      title: 'Webサーバーの接続受付',
      desc: 'ここが長い場合、Webサーバー（CMS）のサーバー側での接続待ち受け準備が不足している場合があります。サーバー管理者と相談しましょう。'
    };

  }


  dat.breakdown.server_init = {
    val: performance.timing.responseStart - performance.timing.requestStart,
    formula: 'requestStart ～ responseStart',
    criteria: 500,
    title: 'Webサーバーでのページデータの準備',
    desc: 'ここが長い場合、Webサーバー（CMS）のサーバー側での処理に時間がかかっています。サーバー管理者と相談しましょう。'
  };

  dat.breakdown.server_output = {
    val: performance.timing.responseEnd - performance.timing.responseStart,
    formula: 'responseStart ～ responseEnd',
    criteria: 1000,
    title: 'WebサーバーからのHTMLデータ転送',
    desc: 'ここが長い場合、転送しているデータ量が多いか、サーバー側（またはユーザー側）のネットワーク速度が遅い場合があります。データ量が多ければ減らし、速度の問題ならば回線を再検討しましょう（ユーザー側のネットワークが遅い場合は対処不可）'
  };

  dat.breakdown.browser = {
    val: performance.timing.loadEventEnd - performance.timing.domLoading,
    formula: 'domLoading ～ loadEventEnd',
    criteria: 1500,
    title: 'ブラウザの処理（画像読み込みやスクリプト実行込み）',
    desc: 'ここが長い場合、以下の内訳のどの部分に時間がかかっているかを確認してください。'
  };

  dat.breakdown.browserDomLoad = {
    val: performance.timing.domInteractive - performance.timing.domLoading,
    formula: 'domLoading ～ domInteractive',
    criteria: 1000,
    title: 'HTML分析＋構築',
    desc: 'ここが長い場合、HTMLやCSSが複雑だったり、読み込む外部画像やスクリプトやCSSが多かったりその参照先が遅かったり（つまりサーバー側の可能性も）、時間がかかるJavaScriptをHTMLの途中で動かしていたりします。<br />広告配信サーバーやアクセス解析サービスのタグのせいで遅くなっている場合もありますが、どこが遅いのかは詳しく調べてみなければわかりません。<br />その調査には、FirefoxならばFirebugの「ネット」パネル、ChromeならばDeveloper Toolの「Network」などが役に立ちます（これらは読み込み時に動作させて通信を記録するタイプ）。'
  };

  dat.breakdown.browserDomInteract = {
    val: (performance.timing.domContentLoadedEventStart - performance.timing.domInteractive) + (performance.timing.domComplete - performance.timing.domContentLoadedEventEnd),
    formula: 'domInteractive ～ domContentLoadedEventStart<br> + domContentLoadedEventEnd ～ domComplete',
    criteria: 1000,
    title: '分析完了後残り構築',
    desc: 'ここが長い場合、読み込む外部画像やスクリプトやCSSが多かったりその参照先が遅かったり（つまりサーバー側の可能性も）、HTMLの途中で複雑なJavaScriptを動かしていたりします。<br />広告配信サーバーやアクセス解析サービスのタグのせいで遅くなっている場合もありますが、どこが遅いのかは詳しく調べてみなければわかりません。<br />その調査には、FirefoxならばFirebugの「ネット」パネル、ChromeならばDeveloper Toolの「Network」などが役に立ちます（これらは読み込み時に動作させて通信を記録するタイプ）。'
  };

  dat.breakdown.browserDomLoadedEvt = {
    val: performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart,
    formula: 'domContentLoadedEventStart ～ domContentLoadedEventEnd',
    criteria: 250,
    title: '表示構築後スクリプト実行',
    desc: 'ここが長い場合、jQueryのreadyなどで動かしているスクリプトで時間がかかっている場合があります（外部の広告配信やアクセス解析などのスクリプトによるものの場合も）。'
  };

  dat.breakdown.browserLoadEvt = {
    val: performance.timing.loadEventEnd - performance.timing.loadEventStart,
    formula: 'loadEventStart ～ loadEventEnd',
    criteria: 250,
    title: '表示完了後スクリプト実行',
    desc: 'ここが長い場合、window.onloadで動かしているスクリプトで時間がかかっている場合があります。'
  }
  

  var lastVal = startTime;
  var timingsLen = timings.length;
  for (var i=0; i< timingsLen; i++) {
    if (timings[i]['val']) {
      msg += timings[i]['key'] + ' = ' + (timings[i]['val'] - lastVal) + ' (' + (timings[i]['val'] - startTime) + ")\n " + timings[i]['val'] + "\n";
      lastVal = timings[i]['val'];
    }
  }


  var msg = '';
  var tdRight = '<td style="text-align: right">';
  var spnEm = '<span style="background-color: #FFFF99; font-weight: bold; padding: 2px 0 2px 4px">';
  var divHead = '<div style="font-size: 1.1em; font-weight: bold; margin-top: 2em">■';
  // 桁区切りとか強調とかのフォーマット出力を作る
  var fmt = function (num, type, base) {
    switch (type) {
    case 'rate':
      return Math.round(num / dat.total * 1000) / 10;
      break;
    case 'numeric':
      num = new String(num).replace(/,/g, '');
      while (num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
      return num;
    case 'numCriteria':
      if (!base) {
        base = 1000;
      }
      if (num > base) {
        return spnEm + fmt(num, 'numeric') + '</span>';
      }
      else {
        return fmt(num, 'numeric');
      }
    default:
      return num;
      break;
    }
  }


  msg += '<div style="font-size: 1.5em; font-weight: bold; padding-bottom: 1em">Web担当者Forum版 ページ速度分析ツール</div>';

  msg += '<p style="font-size: 0.9em">この情報は、お使いのブラウザがいま表示しているページへの<strong>今回の</strong>アクセス＆表示にかかった時間を自動的に記録した情報をもとに出しています（このツールに関して詳しくは <a href="http://web-tan.forum.impressrd.jp/e/2013/01/29/14562">Web担当者Forumの記事</a> をご覧ください）。</p>';

  msg += divHead + '現在ブラウザに表示しているページの表示完了にかかった全体の時間</div>';
  msg += '<div style="font-size: 0.9em; margin 0.25em 0">（リンクをクリック/URLを入力した瞬間から、画像や広告などが読み込まれページ表示が完了するまでの時間）</div>';
  msg += '<div><span style="font-size: 1.4em;"><span' + (dat.total < 1500 ? ' style="color: #00ff00; font-weight: bold"' : (dat.total > 4000 ? ' style="color: #ff0000; font-weight: bold"' : '')) + '>' + fmt(dat.total, 'numeric') + '</span>ミリ秒 （' + (Math.round(dat.total/10)/100) + '秒）</span> <span style="font-size: 0.9em">※1000ミリ秒＝1秒</span></div>';
  msg += '<div class="webtanPerformanceComment">';
  if (dat.total > 8000) {
    msg += 'すごい遅いですね。今回だけなら問題ないですが、何度計測しても同様なら要改善ですね。';
  }
  else if (dat.total > 4000) {
  msg += '遅いですね。今回だけなら問題ないですが、何度計測しても同様なら改善するとユーザーに喜ばれるでしょう。';
  }
  else if (dat.total > 2500) {
    msg += '標準的な速度ですが、少し遅めですね。時間がかかっているポイントを見つけてさらに速くするとユーザーに喜ばれると思います。';
  }
  else if (dat.total > 1500) {
    msg += 'ページ表示は速いですね。すばらしい。改善点は少ないと思います。';
  }
  else if (dat.total < 1000) {
    msg += 'ごっつい速いですね。何も改善する余地はないんじゃないでしょうか。';
  }
  else {
    msg += '標準的な速度ですね。時間がかかっているポイントが明確なら、さらに速くするとユーザーに喜ばれると思います。';
  }
  msg += '</div>';


  msg += divHead + 'パートごとの時間のかかり具合<span style="font-weight: normal">（ビジュアル、主なもののみ）</span></div>';
  msg += '<div style="font-size: 0.9em; margin: 0.25em 0">左から右へ時間が流れていて、バーの長さが長いほど時間がかかっています（重なっている部分は同時処理の部分）。緑色のバーはサーバー側の処理です。</div>';
  msg += '<div class="webtanNavtimeBarWrapper">';

  var barYOffset = 0;

  msg += getNavHTML('redirectStart', 'redirectEnd', 'リダイレクト処理', 'Redirect');

  if (ifOutputInfo('client_beforeDNS')) {
    msg += getNavHTML(timings[getTimingInfo('domainLookupStart', 'keyOfTimings')-1].key, 'domainLookupStart', 'DNS参照前のリクエスト準備', 'BeforeDNS');
  }

  msg += getNavHTML('domainLookupStart', 'domainLookupEnd', 'DNS処理', 'DNS');

  if (ifOutputInfo('client_afterDNS')) {
    msg += getNavHTML('domainLookupEnd', 'connectStart', 'DNS参照後の接続準備', 'PostDNS');
  }

  if (ifOutputInfo('client_init')) {
    msg += getNavHTML('domainLookupEnd', 'requestStart', 'DNS参照後のリクエスト準備', 'PostDNS');
  }

  if (ifOutputInfo('server_connect_ssl')) {
    msg += getNavHTML('connectStart', 'connectEnd', 'Webサーバーの接続受付（SSL）', 'serverConnectSSL');
    msg += getNavHTML('secureConnectionStart', 'connectEnd', 'SSL接続処理', 'SSL');
  }
  else {
    msg += getNavHTML('connectStart', 'connectEnd', 'Webサーバーの接続受付（TCP）', 'Connect');
  }

  msg += getNavHTML('requestStart', 'responseStart', 'Webサーバーでのページデータの準備', '1stByte');

  msg += getNavHTML('responseStart', 'responseEnd', 'WebサーバーからのHTMLデータ転送', 'Response');

  msg += getNavHTML('unloadEventStart', 'unloadEventEnd', '前ページのアンロード処理', 'Unload');

  msg += getNavHTML('domLoading', 'domComplete', 'ブラウザの処理', 'Dom');

  msg += getNavHTML('domLoading', 'domInteractive', 'HTML分析＋構築', 'DomLoad');

  msg += getNavHTML('domInteractive', 'domContentLoadedEventStart', '分析完了後残り構築(1)', 'DomInteractive1');

  msg += getNavHTML('domContentLoadedEventStart', 'domContentLoadedEventEnd', 'readyイベント', 'DomReady');

  msg += getNavHTML('domContentLoadedEventEnd', 'domComplete', '分析完了後残り構築(2)', 'DomInteractive1');

  msg += getNavHTML('loadEventStart', 'loadEventEnd', 'Loadイベント', 'DomLoad');



  msg += '</div>';
  
  msg += divHead + 'パートごとの時間のかかり具合<span style="font-weight: normal">（詳細）</span></div>';
  msg += '<div style="font-size: 0.9em; margin: 0.25em 0">重なり合う部分があるので合計が100%にならない場合があります。</div>';
  msg += '<table><thead><tr><th colspan="2">パート</th><th>かかった時間<br />（ミリ秒）</th><th>全体比率</th><th>説明 （<a href="javascript:void(0);" onclick="(function(){var e = document.getElementsByClassName(\'webtanPerformanceTimingDesc\');for(var i=0; i< e.length; i++){if (!e[i].className.match(/webtanPerformanceTimingShow/)){e[i].className = e[i].className + \' webtanPerformanceTimingShow\';}}})();">すべての解説を表示</a>）</th></tr></thead><tbody';

  for (sKey in dat.breakdown) {
    if (!sKey || dat.breakdown[sKey].val === 0) {
      continue;
    }

    msg += '<tr>';
    switch(sKey){
    case 'browser':
      msg += '<th colspan="2" style="border-bottom: none">';
      break;
    case 'browserDomLoad':
      msg += '<th rowspan="4" style="border-top: none">内訳（代表的なもの、比率は対全体）</th><th>';
      break;
    case 'browserDomInteract':
    case 'browserDomLoadedEvt':
    case 'browserLoadEvt':
      msg += '<th>';
      break;
    case 'server_connect_ssl':
      msg += '<th colspan="2" style="border-bottom: none">';
      break;
    case 'ssl':
      msg += '<th style="border-top: none">内訳</th><th>';
      break;
    default:
      msg += '<th colspan="2">';
      break;
    }

    msg += dat.breakdown[sKey].title + '</th>' + tdRight + fmt(dat.breakdown[sKey].val, 'numCriteria', dat.breakdown[sKey].criteria) + '</td>' + tdRight + fmt(dat.breakdown[sKey].val, 'rate') + '%</td><td><span class="formula">' + dat.breakdown[sKey].formula + '</span><div class="webtanPerformanceTimingDesc' + (dat.breakdown[sKey].val > dat.breakdown[sKey].criteria ? ' webtanPerformanceTimingShow' : '') + '">' + dat.breakdown[sKey].desc + '</div></td></tr>';
  }

  msg += '</tbody></table>';
  


  msg += divHead + 'このページ表示の情報</div>';
  msg += '<ul>';
  if ('undefined' !== typeof performance.navigation.type){
    msg += '<li><strong>ページアクセス方法：</strong>';
    switch (performance.navigation.type) {
    case 0:
      msg += 'リンククリック・URL入力・フォーム送信など通常のアクセス';
      break;
    case 1:
      msg += 'ブラウザのリロード';
      break;
    case 2:
      msg += 'ブラウザの進む/戻る';
      break;
    }
    msg += '</li>';
  }
  if (!performance.navigation.redirectCount){
    msg += '<li><strong>リダイレクト：</strong>なし</li>';
  }
  else {
    msg += '<li><strong>リダイレクト：</strong>'+performance.navigation.redirectCount+'回</li>';
  }
  msg += '</ul>';

  msg += divHead + '詳細情報</div>';
  msg += '<table><thead><tr><th>パート</th><th>消費時間</th><th>累積</th><th>値</th><th>説明</th></tr></thead><tbody>';
  var lastVal = performance.timing.navigationStart;
  var timingsLen = timings.length;
  for (var i = 0; i < timingsLen; i++) {
    if (timings[i]['val']){
      msg += '<tr><th>' + timings[i]['key'] + '</th>' + tdRight + (timings[i]['val'] - lastVal) + '</td>' + tdRight + (timings[i]['val'] - startTime) + '</td>' + tdRight + timings[i]['val'] + '</td><td style="font-size: 0.9em">' + getTimingInfo(timings[i]['key'], 'desc') + '</td></tr>';
      lastVal = timings[i]['val'];
    }
  }
  msg += '</tbody></table>';
  msg += '<div style="margin-top: 2em">参考（<a href="https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html#processing-model">w3cのNavigation Timingの「Processing Model」より</a>）：</div><div><a href="//web-tan.forum.impressrd.jp/tools/pagespeedtiming/navigationtiming.png" target="_blank" title="クリックすると新しいウィンドウ（タブ）でこの概念図を大きく表示します"><img src="//web-tan.forum.impressrd.jp/tools/pagespeedtiming/navigationtiming_m.png" width="600" height="418" alt="PerformanceTiming chart"></a></div>';
  msg += '<div style="height: 2em"></div>';


  msg = '<div id="webtanPerformanceTiming">' + msg + '</div>';
  msg += '<style type="text/css">\
#webtanPerformanceTiming{margin: 2em 1em; padding: 0 1em;overflow-y: auto !important;height: 96%; text-align: left}\
#webtanPerformanceTiming td .formula{font-size: 0.9em}\
#webtanPerformanceTiming td .webtanPerformanceTimingDesc{display: none; font-size: 1em}\
#webtanPerformanceTiming td .webtanPerformanceTimingShow{display: block;}\
#webtanPerformanceTiming table, #webtanPerformanceTiming td, #webtanPerformanceTiming th, #webtanPerformanceTiming tr, #webtanPerformanceTiming thead, #webtanPerformanceTiming tbody{border-collapse: collapse}\
#webtanPerformanceTiming td, #webtanPerformanceTiming th{padding: 0.5em; border: solid 1px #CCCCCC}\
#webtanPerformanceTiming th{font-weight: bold;}\
#webtanPerformanceTiming thead{border-bottom-width: 4px;}\
.webtanNavtimeBarWrapper{position: relative; height: ' + barYOffset + 'em;}\
.webtanNavtimeBar{position: absolute; height: 1.5em; overflow: hidden; background-color: rgb(137,232,251)}\
.webtanNavtimeBarInner{border: solid 1px rgb(85,142,213); overflow: hidden; background-color: transparent; width: 100%; height: 100%; -moz-box-sizing: border-box; box-sizing: border-box;}\
.webtanNavtimeBarCaption{position: absolute; height: 1em; line-height: 1; padding-top: 3px;}\
.webtanNavtimeBarConnect, .webtanNavtimeBar1stByte, .webtanNavtimeBarResponse{background-color: rgb(207,252,166);}\
.webtanNavtimeBarConnect .webtanNavtimeBarInner, .webtanNavtimeBar1stByte .webtanNavtimeBarInner, .webtanNavtimeBarResponse .webtanNavtimeBarInner{border-color: rgb(139,248,40)}\
.webtanPerformanceComment{background-color: #FFFFEA; padding: 0.5em;}\
</style>';


  /**
   * ポップアップを作って返す関数
   * @popupId
   * ポップアップdivに付けるid（任意）
   * @popupStyle
   * ポップアップdivに設定するstyleをelement.styleに準じたフォーマットで（任意）
   * @popupCntent
   * ポップアップに表示する内容をHTMLで（任意）
   */
  var createPopupWindow = function (popupId, popupStyle, popupContent) {

    var
    // styleなどからpxを取った値を返す。
    // 数値として扱うのが目的なので数値で返すし、おかしかったら0を返す
      removePx = function (s){
        if (!s) {
          return 0;
        }
        else {
          s = String(s);
          if (s.substr(s.length - 2, 2) === 'px'){
            s = eval(s.replace(/ *px$/, ''));
          }
          return parseInt(s);
        }
      },

      // ビューポートのサイズを出しておく
      vp = function () {
        var viewPort = {};
        if (window.innerWidth) {
          viewPort.width = window.innerWidth - 30;
          viewPort.height = window.innerHeight - 30;
        }
        else if (document.all) {
          if (document.documentElement.clientWidth){
            viewPort.width = document.documentElement.clientWidth - 30;
            viewPort.height = document.documentElement.clientHeight - 30;
          }
          else {
            viewPort.width = document.body.clientWidth - 30;
            viewPort.height = document.body.clientHeight - 30;
          }
        }
        return viewPort;
      }(),

      // スクロール状態
      pos = {x:window.pageXOffset, y:window.pageYOffset},

      // ポップアップウィンドウのデフォルトスタイル
      defaultStyles = {
        display : 'block',
        position : 'absolute',
        borderRadius : '10px',
        boxShadow : '10px 10px 10px rgba(0,0,0,0.4)',
        backgroundColor : '#ffffff',
        borderWidth : '4px',
        borderColor : '#666',
        borderStyle : 'double',
        overflow : 'hidden',
        zIndex : 'auto',
        width : '400px',
        height : '600px'
      },

      // ポップアップ要素作成
      popup = document.createElement('div');

    if (popupId) {
      popup.id = popupId;
    }

    if (!popupStyle) {
      popupStyle = {};
    }
    for (var sKey in defaultStyles) {
      if (sKey && !popupStyle[sKey]){
        popupStyle[sKey] = defaultStyles[sKey];
      }
    }
    for (var sKey in popupStyle) {
      if (sKey) {
        popup.style[sKey] = popupStyle[sKey];
      }
    }

    if ((vp.width  - 30) <= removePx(popup.style.width)) {
      popup.style.width = (vp.width - 30) + 'px';
    }
    if ((vp.height - 30) <= removePx(popup.style.height)) {
      popup.style.height = (vp.height - 30) + 'px';
    }
    popup.style.left = 
      Math.round((vp.width
        - removePx(popup.style.width || 0)
        - removePx(popup.style.borderLeftWidth || 0)
        - removePx(popup.style.borderRightWidth || 0)
        - removePx(popup.style.paddingLeft || 0)
        - removePx(popup.style.paddingRight || 0)
        )/2 + pos.x) + 'px';
    popup.style.top = 
      Math.round((vp.height
        - removePx(popup.style.height || 0)
        - removePx(popup.style.borderTopWidth || 0)
        - removePx(popup.style.borderBottomWidth || 0)
        - removePx(popup.style.paddingTop || 0)
        - removePx(popup.style.paddingBottom || 0)
      )/2 + pos.y) + 'px';

    // コンテンツ用のdivを作っておく
    var contentDiv = document.createElement('div');
    contentDiv.style.overflow = 'hidden';
    contentDiv.style.height = '100%';
    popup.appendChild(contentDiv);
    
    // 閉じるボタン
    var bClose = document.createElement('a');
    bClose.innerHTML = '[X]';
    with (bClose.style) {
      position = 'absolute';
      top = '0.5em';
      right = '1em';
      cursor = 'pointer';
    }
    bClose.setAttribute('title', 'クリックでこのポップアップを閉じます');
    popup.appendChild(bClose);
    // 閉じるボタンのイベントattach
    var addEvt = function (obj, type, func) {
      if (obj.addEventListener) {
        obj.addEventListener(type, func, false);
      }
      else {
        if (obj.attachEvent) {
          obj.attachEvent('on' + type, func);
        }
      }
    }
    addEvt(
      bClose,
      'click',
      function () {this.parentNode.parentNode.removeChild(this.parentNode);}
    );

    // 中身を流し込む（innerHTML使うとイベントが消える）
    popupContent = popupContent || '';
    contentDiv.innerHTML = popupContent;

    // 表示
    document.getElementsByTagName('body')[0].appendChild(popup);


    return popup;
  }

  createPopupWindow('', {width: '900px', height: '1000px', borderColor: '#ec6089', borderWidth: '4px', borderStyle: 'solid', zIndex: 1000}, msg);

})();