//homepageからinstagramのリンクを見つける.
function instaurl(url){
  newurl=url.match(/https:\/\/.*?\//);
  const res = UrlFetchApp.fetch(url).getContentText('UTF-8');
  //instagramのリンクをくり抜く.
  let box=res.match(/https:\/\/www.instagram.com\/[^<>]*\//);
  if(box){
    //console.log(box[0]);
    return box[0];
  }else{
    return '';
  }
}
function instasearch(){
  //最終行
  let lastrow=sheet2.getLastRow();
  //探索するURLsの範囲
  var urlrange=sheet2.getRange(2,2,lastrow-1,1);
  //探索するURLs
  var boxes=urlrange.getValues();
  var newboxes=[];
  boxes.forEach(function(box){
    newbox=[box[0],instaurl(box[0])];
    newboxes.push(newbox);
  })
  //出力範囲
  var range=sheet2.getRange(2,2,lastrow-1,2);
  range.setValues(newboxes);
}
