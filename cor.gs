function main() {
  const url = "https://itp.ne.jp/genre?genre=%E3%82%B0%E3%83%AB%E3%83%A1%E3%83%BB%E9%A3%B2%E9%A3%9F&subgenre=28&sort=01&sbmap=false&area=13103";
  let response = UrlFetchApp.fetch(url);
  let content = response.getContentText("utf-8");
  //必要な情報抜き出し
  let regex=/(?<=<a target="_blank" href=.*?>).*?(?=<\/a>)|(?<=<span class="wixui-rich-text__text">(\(代\))?) [(\d)-]+(?=<\/span>)/g;
  var cops=content.match(regex);
  var boxes=[];
  //スプレッドシートに出力しやすいように二次元配列化
  let numOfElements = 2;

  for(let i = 0; 0 < cops.length; i){
 
    boxes.push(cops.splice(i, numOfElements));

  }
  console.log(boxes[3]);
}


function sp(boxes){
  //spreadsheetの指定　Idは要変更
  const ss = SpreadsheetApp.openById('1FDQ_8JePW1QD5_H2e41k_1V4KPKya1l4OmO2Phw_fDo');
  const sheet0 =ss.getSheets()[0];
  let num_box=boxes.length;
  let range= sheet0.getRange(2,1,num_box,rownum);
}
