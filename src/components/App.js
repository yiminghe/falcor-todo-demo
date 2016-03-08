import React from 'react';
import 'babel-polyfill';
import AllTodos from './AllTodos';
import TopTodos from './TopTodos';
import BottomTodos from './BottomTodos';
import { Provider } from 'react-redux';
import configure from '../store/index';
const store = configure();

const App = React.createClass({
  render() {
    return (<Provider store={store}>
      <div style={{ width: 1000, margin: '0 auto' }}>
        <h2>all todos</h2>
        <AllTodos />
        <h2>top 2 todos</h2>
        <TopTodos />
        <h2>bottom 2 todos</h2>
        <BottomTodos />
      </div>
    </Provider>);
  },
});

export default App;
