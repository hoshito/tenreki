import express from 'express'
import bodyParser from 'body-parser'
import {getClient, getTweetInfoForFullCalendar} from '../plugins/twitter'

const app = express()
// requestでjsonを扱えるように設定
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/tweets', (req, res) => {
  let client = getClient(req.body.token, req.body.secret);
  // TODO: リクエストパラメータに入れる
  let params = {owner_screen_name: "liktastar", slug: "Love", count: 200};
  client.get('lists/statuses', params).then(tweets => {
    let result = getTweetInfoForFullCalendar(tweets);
    res.send(result);
  }).catch((errors) => {
    // TODO: error処理
    console.log(errors);
  });
})

module.exports = {
  path: '/api',
  handler: app
}

