//spreadsheetの指定　Idは要変更
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet0 = ss.getSheets()[0];
  const sheet1 = ss.getSheets()[1];


function main() {
  //url 要変更
  const url = "https://itp.ne.jp/genre?genre=%E3%82%B0%E3%83%AB%E3%83%A1%E3%83%BB%E9%A3%B2%E9%A3%9F&subgenre=28&sort=01&sbmap=false&area=13103";
  //ページ数　要変更
  let pagenum = 6;
  //情報を入れる予定の空箱
  let boxes = [];
  //各ページごとに取得
  for (let i = 0; i < pagenum; ++i) {
    //会社数
    let conum=i*20;
    //各ページのurl
    let url2 = url + "&from=" + conum;
    //console.log(url2);
    let response = UrlFetchApp.fetch(url2);
    let content = response.getContentText("utf-8");
    //必要な情報抜き出し
    let regex = /(?<=<a target="_blank" href=.*?>).*?(?=<\/a>)|(?<=<span class="wixui-rich-text__text">(\(.*?\))?) [(\d)-]+(?=<\/span>)/g;
    let cops = content.match(regex);
    //スプレッドシートに出力しやすいように二次元配列化
    let numOfElements = 2;

    for (let i = 0; 0 < cops.length; i) {

      boxes.push(cops.splice(i, numOfElements));

    }
  }
  //スプレッドシートに出力
  sp(boxes);
}


function sp(boxes) {
  let num_box = boxes.length;
  let low_num = boxes[0].length;
  let range = sheet0.getRange(2, 1, num_box, low_num);
  range.setValues(boxes);
}
