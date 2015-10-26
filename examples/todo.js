// use jsx to render html, do not modify simple.html

window.global = window

import 'antd/lib/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './todo/App';

function add() {
  model.setValue('todo.default[0].priority', 10).then(function () {
    console.log('setValue ', arguments);
  }).then(function () {
    return model.get('todo.default[0..1]["name","done","id","priority"]');
  }).then(function (response) {
    console.log('todo.default after set', response);
  });
}

function removeCache() {
  model.invalidate('todo.default[0]');
  // or
  // model.invalidate('t'+'odo.default[0]["name","done","id","priority"]');
}


ReactDOM.render(<App />, document.getElementById('__react-content'));
