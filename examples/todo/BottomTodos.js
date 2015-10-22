import React from 'react';
import model from './model';
import Table from 'antd/lib/table';
import GlobalEvent from './GlobalEvent';

var columns = [{
  title: '名字',
  dataIndex: 'name'
}, {
  title: '优先级',
  dataIndex: 'priority'
}];

var BottomTodos = React.createClass({
  getInitialState() {
    return {
      loading: true,
      data: [],
    };
  },
  fetch(){
    model.get(`todo.bottom[0..1]["name","done","id","priority"]`).then((d)=> {
      var data = [];
      var ret = d.json.todo.bottom;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.setState({
        data,
        loading: false
      })
    });
  },
  onPriorityChange() {
    model.invalidate('todo.bottom');
    this.fetch();
  },
  componentDidMount() {
    GlobalEvent.on('priorityChange', this.onPriorityChange);
    this.fetch();
  },
  onPagerChange(pageNum) {
    this.setState({
      loading: true
    });
    this.fetchData(pageNum);
  },
  render(){
    const state = this.state;
    return <Table columns={columns}
                  rowKey={(r)=>r.id}
                  dataSource={state.data}
                  pagination={false}
                  className={state.loading?'ant-table-loading':''}/>
  }
});

export default BottomTodos;
