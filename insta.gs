//homepageからinstagramのリンクを見つける.
function findurl(url){
  var newurlbox=url.match(/https:\/\/.*?\//);
  let newurl=newurlbox[0];
  const res = UrlFetchApp.fetch(newurl).getContentText('UTF-8');
  var newbox=[];
  //メールをくり抜く
  let mailbox=res.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  //お問合せのリンクの正規表現
  let regex= new RegExp(newurl+'[^<>]*contact\/');
  //お問合せのリンクをくり抜く.
  let concatbox=res.match(regex);
  //instagramのリンクをくり抜く.
  let instabox=res.match(/https:\/\/www.instagram.com\/[^<>]*\//);
  if(mailbox){
    newbox.push(mailbox[0]);
  }else{
    newbox.push('');
  }
  if(concatbox){
    newbox.push(concatbox[0])
  }else{
    newbox.push('');
  }
  if(instabox){
    newbox.push(instabox[0])
  }else{
    newbox.push('');
  }
  console.log(newbox);
  return newbox;
}

function urlsearch(){
  //最終行
  let lastrow=sheet2.getLastRow();
  //探索するURLsの範囲
  var urlrange=sheet2.getRange(2,2,lastrow-1,1);
  //探索するURLs
  var boxes=urlrange.getValues();
  var newboxes=[];
  boxes.forEach(function(box){
    var newbox=findurl(box[0]);
    newboxes.push(newbox);
  })
  //出力範囲
  let num=newboxes[0].length;
  let rownum=newboxes.length;
  var range=sheet2.getRange(2,3,rownum,num);
  //出力
  range.setValues(newboxes);
}
