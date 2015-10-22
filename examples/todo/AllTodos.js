import React from 'react';
import model from './model';
import Table from 'antd/lib/table';

var columns = [{
  title: '名字',
  dataIndex: 'name'
}, {
  title: '优先级',
  dataIndex: 'priority'
}];

var pageSize = 2;

var DefaultTodos = React.createClass({
  getInitialState() {
    return {
      loading: true,
      data: [],
      currentPage: 1,
      total: 0,
    };
  },
  componentDidMount() {
    this.fetchData(1);
  },
  fetchData(pageNum){
    var start = (pageNum - 1) * pageSize;
    var end = start + pageSize - 1;
    model.get(`todo.default[${start}..${end}]["name","done","id","priority"]`, 'todo.length').then((d)=> {
      var data = [];
      var ret = d.json.todo.default;
      var total = d.json.todo.length;
      Object.keys(ret).forEach((k)=> {
        data.push(ret[k]);
      });
      this.setState({
        data,
        currentPage: pageNum,
        loading: false,
        total: total,
      })
    });
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
                  pagination={
                  state.total ? {
                    current:state.currentPage,
                    total:state.total,
                    pageSize:pageSize,
                    onChange:this.onPagerChange,
                  }:false
                  }
                  className={state.loading?'ant-table-loading':''}/>
  }
});

export default DefaultTodos;
