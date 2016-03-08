import React from 'react';
import Table from 'antd/lib/table';
import connect from '../common/connect';

const DefaultTodos = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    allTodos: React.PropTypes.object,
  },
  getInitialState() {
    const self = this;
    const columns = [{
      title: '名字',
      dataIndex: 'name',
    }, {
      title: '优先级',
      dataIndex: 'priority',
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id, data) {
        return data.loading ? 'loading' :
          <a onClick={self.increase.bind(self, id)}>increase priority</a>;
      },
    }];
    return {
      columns,
    };
  },
  componentDidMount() {
    this.props.actions.fetchAllTodos();
  },
  onChange(pagination) {
    this.props.actions.fetchAllTodos({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    });
  },
  increase(id) {
    this.props.actions.increaseTodoPriority({
      id,
    });
  },
  render() {
    const { loading, data, pageSize, pageNum, total } = this.props.allTodos;
    const pagination = total ? {
      current: pageNum,
      total,
      pageSize,
    } : {};
    return (<Table
      columns={this.state.columns}
      rowKey={(r) => r.id}
      dataSource={data}
      onChange={this.onChange}
      pagination={pagination}
      loading={loading}
    />);
  },
});

export default connect((state) => {
  return {
    allTodos: state.allTodos,
  };
})(DefaultTodos);
