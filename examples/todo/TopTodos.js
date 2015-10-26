import React from 'react';
import model from './model';
import Table from 'antd/lib/table';
import GlobalEvent from './GlobalEvent';
import Roof from 'roof';

var columns = [{
  title: '名字',
  dataIndex: 'name'
}, {
  title: '优先级',
  dataIndex: 'priority'
}];

var TopTodos = Roof.createContainer({
  cursors : {
    topTodos : 'topTodos'
  },
  getInitialState() {
    return {
    };
  },
  componentDidMount() {
    this.props.topTodos.fetchTop();
  },
  render(){
    return <Table columns={columns}
                  rowKey={(r)=>r.id}
                  dataSource={this.props.topTodos.toArray()}
                  pagination={false}
                  className={this.props.topTodos.is('fetchTop.processing')?'ant-table-loading':''}/>
  }
});

export default TopTodos;
