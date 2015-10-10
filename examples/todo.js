// use jsx to render html, do not modify simple.html

import 'rc-falcor-todo/assets/index.less';
import FalcorTodo from 'rc-falcor-todo';
import React from 'react';
import falcor from 'falcor/dist/falcor.browser';

var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json')}).batch();

model.get('todo.top[0..1]["name","done","id","priority"]').
  then(function (response) {
    console.log('todo.top', response);
  });

model.get('todo.bottom[0..1]["name","done","id","priority"]').
  then(function (response) {
    console.log('todo.bottom', response)
  });

model.get('todo.default[0..1]["name","done","id","priority"]').
  then(function (response) {
    console.log('todo.default', response)
  });

React.render(<FalcorTodo />, document.getElementById('__react-content'));
