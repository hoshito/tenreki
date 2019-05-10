<template>
  <section class="container">
    <button class="login-button" @click="login">Twitter Login</button>
    <FullCalendar ref="fullCalendar" defaultView="dayGridMonth" :plugins="calendarPlugins"
                  @eventRender="handleEventRender" :events="events"></FullCalendar>
  </section>
</template>

<script>
  import firebase from '~/plugins/firebase'
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import Vue from 'vue'

  const axios = require('axios');

  export default {
    data: function () {
      return {
        calendarPlugins: [dayGridPlugin],
        events: [] // fullcalendarのevents
      }
    },
    created: function () {
    },
    components: {
      FullCalendar
    },
    methods: {
      login() {
        const self = this;
        let token = sessionStorage.getItem('token');
        let secret = sessionStorage.getItem('secret');
        let name = sessionStorage.getItem('name');
        if (token && secret && name) {
          // 認証不要
          self.getTweets(token, secret, name);
        } else {
          // 認証
          const provider = new firebase.auth.TwitterAuthProvider();
          firebase.auth().signInWithPopup(provider).then(result => {
            let token = result.credential.accessToken;
            let secret = result.credential.secret;
            let name = result.additionalUserInfo.username;
            self.setSession(token, secret, name);
            self.getTweets(token, secret, name);
          });
        }
      },
      setSession(token, secret, name) {
        sessionStorage.token = token;
        sessionStorage.secret = secret;
        sessionStorage.name = name;
      },
      getTweets(token, secret, name) {
        const self = this;
        const params = {token: token, secret: secret, name: name};
        axios.post(Vue.config.url.tweets, params).then(res => {
          self.events = res.data;
          setTimeout(function() {
            // 表示が崩れてしまうため再読込
            self.$refs.fullCalendar.getApi().rerenderEvents();
          }, 500);
        }).catch(err => {
          alert(err);
        });
      },
      handleEventRender(info) {
        // info.elの構造
        // <a class="fc-event..."><div class="fc-content"><span class="fc-title"></span></div></a>
        info.el.children[0].children[0].innerHTML = "<img src='" + info.event.extendedProps.image_url + "'>";
        // ツールチップにtweet本文を載せる
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.text,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      }
    }
  }
</script>

<style>

  @import '../node_modules/@fullcalendar/core/main.css';
  @import '../node_modules/@fullcalendar/daygrid/main.css';

  .popper,
  .tooltip {
    position: absolute;
    z-index: 9999;
    background: #FFC107;
    color: black;
    width: 150px;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    padding: 10px;
    text-align: center;
  }

  .style5 .tooltip {
    background: #1E252B;
    color: #FFFFFF;
    max-width: 200px;
    width: auto;
    font-size: .8rem;
    padding: .5em 1em;
  }

  .popper .popper__arrow,
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .tooltip .tooltip-arrow,
  .popper .popper__arrow {
    border-color: #FFC107;
  }

  .style5 .tooltip .tooltip-arrow {
    border-color: #1E252B;
  }

  .popper[x-placement^="top"],
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .popper[x-placement^="top"] .popper__arrow,
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .popper[x-placement^="bottom"],
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow,
  .popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"],
  .popper[x-placement^="right"] {
    margin-left: 5px;
  }

  .popper[x-placement^="right"] .popper__arrow,
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .popper[x-placement^="left"],
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .popper[x-placement^="left"] .popper__arrow,
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .login-button {
    border: none;
    border-radius: 5px;
    background-color: #1DA1F3;
    color: white;
    font-size: 12px;
    padding: 10px;
    cursor: pointer;
  }
</style>

