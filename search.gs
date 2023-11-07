//yahoo検索からhomepageを見つける。
function url(str){
  const encodeWord = encodeURI(str);
  const url = 'https://search.yahoo.co.jp/search?p='+encodeWord;
  const res = UrlFetchApp.fetch(url).getContentText('UTF-8');
  const $ = Cheerio.load(res);
  //URL文字列を入れておくための配列
  const arr = [];
  //繰り返し要素を指定して
  $('li a').each((i,elem) => {
    //繰り返し要素の中にあるhrefの値を取得する
    arr[i] = $(elem).attr('href');
  });
  //欲しいのは最初の検索結果のみ
  return arr[0];
}

function search(){
  let lastRow=sheet0.getLastRow();
  var boxes=sheet0.getRange(2,1,lastRow-1,1).getValues();
  let newboxes=[];
  boxes.forEach(function(box){
    let name=box[0];
    let newname=url(name);
    //検索回数を少なくする
    Utilities.sleep(500);
    newboxes.push([name,newname]);
  })
  //スプレッドシートに出力
  //出力範囲
  sheet1.getRange(2,1,lastRow-1,2).setValues(newboxes);
}

