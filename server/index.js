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
  client.get('friends/list', {}).then((users) => {
    res.send(users);
  }).catch((errors) => {
  })
})

module.exports = {
  path: '/api',
  handler: app
}


