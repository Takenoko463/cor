function main() {
  const url = "https://itp.ne.jp/genre?genre=%E3%82%B0%E3%83%AB%E3%83%A1%E3%83%BB%E9%A3%B2%E9%A3%9F&subgenre=28&sort=01&sbmap=false&area=13103";
  let response = UrlFetchApp.fetch(url);
  let content = response.getContentText("utf-8");
  console.log(content);
}
