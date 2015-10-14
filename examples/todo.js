// use jsx to render html, do not modify simple.html

import 'rc-falcor-todo/assets/index.less';
import FalcorTodo from 'rc-falcor-todo';
import React from 'react';
import falcor from 'falcor/dist/falcor.browser';

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/model.json')
}).batch();

function getTop() {
  model.get('todo.top[0..1]["name","done","id","priority"]').
    then(function (response) {
      console.log('todo.top', response);
    });
}

function getBottom() {
  model.get('todo.bottom[0..1]["name","done","id","priority"]').
    then(function (response) {
      console.log('todo.bottom', response)
    });
}

function getDefault(){
model.get('todo.default[0..1]["name","done","id","priority"]').
  then(function (response) {
    console.log('todo.default', response)
  });
}

function add() {
  model.setValue('todo.default[0].priority', 10).then(function () {
    console.log('setValue ', arguments);
  }).then(function () {
    return model.get('todo.default[0..1]["name","done","id","priority"]');
  }).then(function (response) {
    console.log('todo.default after set', response);
  });
}

function removeCache(){
  model.invalidate('todo.default[0]');
  // or
  // model.invalidate('t'+'odo.default[0]["name","done","id","priority"]');
}

getBottom();
getTop();
getDefault();

React.render(<div>
  <button onClick={add}>increase priority</button>
  <button onClick={getDefault}>get default first 3</button>
  <button onClick={getTop}>get top 3</button>
  <button onClick={getBottom}>get bottom 3</button>
  <button onClick={removeCache}>remove first one from cache</button>

</div>, document.getElementById('__react-content'));
