import React from 'react';
import model from './model';
import Table from 'antd/lib/table';
import GlobalEvent from './GlobalEvent';

var pageSize = 2;

var DefaultTodos = React.createClass({
  getInitialState() {
    var self = this;
    var columns = [{
      title: '名字',
      dataIndex: 'name'
    }, {
      title: '优先级',
      dataIndex: 'priority'
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id) {
        return <a onClick={self.increase.bind(self,id)}>increase priority</a>;
      }
    }];
    return {
      loading: true,
      columns: columns,
      data: [],
      currentPage: 1,
      total: 0,
    };
  },

  increase(id) {
    model.call('actions.increasePriority', [id]).then((d)=> {
      this.fetchData(this.state.currentPage);
      GlobalEvent.emit('priorityChange');
    });
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
    return <Table columns={state.columns}
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
