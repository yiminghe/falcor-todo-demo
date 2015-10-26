import {Nodes} from 'roof';
import Todo from './Todo';
import model from '../model';

export default Nodes.createClass({
  $factory: Todo,

  increase: [function increase(id) {
    return Promise.resolve(model.call('actions.increasePriority', [id]));
  }, 'increase.initial', 'increase.processing', 'increase.end'],

  fetch: function fetch(start, end) {
    return model.get(`todo.default[${start}..${end}]["name","done","id","priority"]`, 'todo.length').then((d)=> {
      var data = [];
      var ret = d.json.todo.default;
      var total = d.json.todo.length;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.replace(data);
      this.total = total
    });
  },

  fetchAll: [function (pageNum, pageSize) {
    pageSize = pageSize || 2;
    var start = (pageNum - 1) * pageSize;
    var end = start + pageSize - 1;
    return model.get(`todo.default[${start}..${end}]["name","done","id","priority"]`, 'todo.length').then((d)=> {
      var data = [];
      var ret = d.json.todo.default;
      var total = d.json.todo.length;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.replace(data);
      this.pageNum = pageNum;
      this.pageSize = pageSize
      this.total = total
    });
  }, 'fetchAll.initial', 'fetchAll.processing', 'fetchAll.end'],

  fetchTop: [function fetchTop() {
    return model.get(`todo.top[0..1]["name","done","id","priority"]`).then((d)=> {
      var data = [];
      var ret = d.json.todo.top;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.replace(data);
    });
  }, 'fetchTop.initial', 'fetchTop.processing', 'fetchTop.end'],

  forceFetchTop: function () {
    model.invalidate('todo.top');
    return this.fetchTop.apply(this, arguments);
  },

  forceFetchBottom: function () {
    model.invalidate('todo.bottom');
    return this.fetchBottom.apply(this, arguments);
  },

  fetchBottom: [function fetchBottom() {
    return model.get(`todo.bottom[0..1]["name","done","id","priority"]`).then((d)=> {
      var data = [];
      var ret = d.json.todo.bottom;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.replace(data);
    });
  }, 'fetchBottom.initial', 'fetchBottom.processing', 'fetchBottom.end'],
});
