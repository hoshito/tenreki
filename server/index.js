import express from 'express'

import bodyParser from 'body-parser'

const Twitter = require('twitter');

const app = express()
// requestでjsonを扱えるように設定
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: req.body.token,
    access_token_secret: req.body.secret
  });
  client.get('friends/list', {count: 200}).then((users) => {
    res.send(users);
  }).catch((errors) => {
  })
})

app.post('/tweets', (req, res) => {
  var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: req.body.token,
    access_token_secret: req.body.secret
  });
  client.get('lists/statuses', {owner_screen_name: "liktastar", slug: "Love", count: 200}).then((tweets) => {
    var result = [];
    tweets.forEach((d) => {
      var date = new Date();
      var reg_result = d.text.match((/\d{1,2}\/\d{1,2}/g)) || d.text.match((/\d{1,2}月\d{1,2}日/g));
      if (!reg_result) { return; } // continueはforEachに無いことに注意
      if (reg_result) {
        var arr = reg_result[0].split(/[\/月日]/)
        date = date.getFullYear() + "-" + ("0" + arr[0]).slice(-2) + "-" + ("0" + arr[1]).slice(-2);
      } else {
        date = null;
      }
      result.push({
        created_at: d.created_at,
        id: d.id,
        text: d.text,
        user_id: d.user.id,
        user_name: d.user.name,
        image_url: d.user.profile_image_url_https,
        date: date,
      });
    });
    res.send(result);
  }).catch((errors) => {
  })
})

module.exports = {
  path: '/api',
  handler: app
}


