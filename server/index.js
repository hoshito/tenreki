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
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  var params = {screen_name: 'hoshitostar'};
  client.get('friends/list', params).then((users) => {
    res.send(users);
  }).catch((errors) => {
  })
})

module.exports = {
  path: '/api',
  handler: app
}


