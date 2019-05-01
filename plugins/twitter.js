// TwitterAPIのクライアントクラスを取得
function getClient(token, secret) {
  const Twitter = require('twitter');
  return new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: secret
  });
}

// TwitterAPIで取得したツイート情報をFullCalendarで扱う形にする
function getTweetInfoForFullCalendar(tweets) {
  var result = [];
  tweets.forEach(t => {
    let dateStr = textToDateStr(t.text);
    // 日付情報がないツイートは対象外
    if (dateStr) {
      result.push({
        created_at: t.created_at,
        id: t.id,
        text: t.text,
        user_id: t.user.id,
        user_name: t.user.name,
        image_url: t.user.profile_image_url_https,
        date: dateStr,
      });
    }
  });
  return result;
}

// private-------
// textから最初に現れる日付情報を抽出して, 文字列で返す
// TODO: 日付にも様々あるから抽出を検討する必要あり(開始日付なのか終了日付なのか, 範囲を持つものなのか)
function textToDateStr(text) {
  // mm/dd or mm月dd日
  let reg_result = text.match((/\d{1,2}\/\d{1,2}/g)) || text.match((/\d{1,2}月\d{1,2}日/g));
  if (reg_result) {
    let arr = reg_result[0].split(/[\/月日]/)
    // TODO: 年明け前後で問題になる(01/01を翌年の01/01と認識しない)
    // 月日は0埋めして2桁で表示しないとfullcalendarが認識しない
    return (new Date().getFullYear()) + "-" +
      ("0" + arr[0]).slice(-2) + "-" +
      ("0" + arr[1]).slice(-2);
  } else {
    return null;
  }
}

export {getClient, getTweetInfoForFullCalendar}

