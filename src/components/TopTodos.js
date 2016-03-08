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

const TopTodos = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    topTodos: React.PropTypes.object,
  },
  componentDidMount() {
    this.props.actions.fetchTopTodos();
  },
  render() {
    const { data, loading } = this.props.topTodos;
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
    topTodos: state.topTodos,
  };
})(TopTodos);
