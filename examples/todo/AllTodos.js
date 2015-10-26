import React from 'react';
import model from './model';
import Table from 'antd/lib/table';
import Roof from 'roof';

var DefaultTodos = Roof.createContainer({
  cursors : {
    allTodos : 'allTodos'
  },
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
      columns: columns
    };
  },
  increase(id) {
    this.props.allTodos.increase(id);
  },
  componentDidMount() {
    this.props.allTodos.fetchAll(1);
  },
  onPagerChange(pageNum) {
    this.props.allTodos.fetchAll(pageNum);
  },
  render(){
    const allTodos = this.props.allTodos;
    return <Table columns={this.state.columns}
                  rowKey={(r)=>r.id}
                  dataSource={allTodos.toArray()}
                  pagination={
                  allTodos.total ? {
                    current:allTodos.pageNum,
                    total:allTodos.total,
                    pageSize:allTodos.pageSize,
                    onChange:this.onPagerChange,
                  }:false
                  }
                  className={this.props.allTodos.is(['fetchAll.processing','increase.processing'])?'ant-table-loading':''}/>
  }
});

export default DefaultTodos;
