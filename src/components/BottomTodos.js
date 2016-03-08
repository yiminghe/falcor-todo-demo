import React from 'react';
import Table from 'antd/lib/table';
import connect from '../common/connect';

const columns = [{
  title: '名字',
  dataIndex: 'name',
}, {
  title: '优先级',
  dataIndex: 'priority',
}];

const BottomTodos = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    bottomTodos: React.PropTypes.object,
  },
  componentDidMount() {
    this.props.actions.fetchBottomTodos();
  },
  render() {
    const { data, loading } = this.props.bottomTodos;
    return (<Table
      columns={columns}
      rowKey={(r) => r.id}
      dataSource={data}
      pagination={false}
      loading={loading}
    />);
  },
});

export default connect((state) => {
  return {
    bottomTodos: state.bottomTodos,
  };
})(BottomTodos);
