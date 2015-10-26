import {Nodes} from 'roof';
import Todo from './Todo';
import model from '../model';

export default Nodes.createClass({
  $factory : Todo,
  increase: [function increase( index ) {

    return new Promise(function( resolve){
      window.setTimeout(function(){
        resolve()
      },1000)
    })

  }, 'increase.initial', 'increase.processing', 'increase.end'],
  fetch : function fetch(start, end) {
    return model.get(`todo.default[${start}..${end}]["name","done","id","priority"]`, 'todo.length').then((d)=> {
      var data = [];
      var ret = d.json.todo.default;
      var total = d.json.todo.length;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });

      this.replace(data)
      this.total = total
    });
  },
  fetchAll : [function(pageNum, pageSize){
    pageSize = pageSize || 2
    var start = (pageNum -1) * pageSize
    var end = start + pageSize -1

    return this.fetch(start, end).then(()=>{
      this.pageNum = pageNum
      this.pageSize = pageSize
    })
  }, 'fetchAll.initial', 'fetchAll.processing', 'fetchAll.end'],
  fetchTop : [function fetchTop() {
    return this.fetch(0, 2)
  }, 'fetchTop.initial', 'fetchTop.processing', 'fetchTop.end'],
});