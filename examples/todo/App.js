import React from 'react';
import Roof from 'roof';
import _ from 'roof/addon/react/container';
import AllTodos from './AllTodos';
import TopTodos from './TopTodos';
import BottomTodos from './BottomTodos';
import allTodos from './data/allTodos';
import topTodos from './data/topTodos';
import bottomTodos from './data/bottomTodos';


const App = Roof.createRootContainer({
  data : {
    allTodos,
    topTodos,
    bottomTodos,
  },
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
