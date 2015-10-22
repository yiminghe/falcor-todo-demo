import React from 'react';
import AllTodos from './AllTodos';
import TopTodos from './TopTodos';
import BottomTodos from './BottomTodos';

const App = React.createClass({
  render() {
    return (<div style={{width:1000, margin:'0 auto'}}>
      <h2>all todos</h2>
      <AllTodos />
      <h2>top 2 todos</h2>
      <TopTodos />
      <h2>bottom 2 todos</h2>
      <BottomTodos />
    </div>);
  }
});

export default App;
