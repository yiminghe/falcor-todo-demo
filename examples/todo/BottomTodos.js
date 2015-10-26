import React from 'react';
import model from './model';
import Table from 'antd/lib/table';
import Roof from 'roof';

var columns = [{
  title: '名字',
  dataIndex: 'name'
}, {
  title: '优先级',
  dataIndex: 'priority'
}];

var bottomTodos = Roof.createContainer({
  cursors : {
    bottomTodos : 'bottomTodos'
  },
  getInitialState() {
    return {
    };
  },
  componentDidMount() {
    this.props.bottomTodos.fetchBottom();
  },
  render(){
    return <Table columns={columns}
                  rowKey={(r)=>r.id}
                  dataSource={this.props.bottomTodos.toArray()}
                  pagination={false}
                  className={this.props.bottomTodos.is('fetchTop.processing')?'ant-table-loading':''}/>
  }
});

export default bottomTodos;
