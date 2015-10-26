import Todos from '../types/Todos';

export default {
  init: function topTodoDefine(allTodos) {
    var topTodos = new Todos([]);

    allTodos.on('change', function updateTopTodos(val, oldVal, detail) {
      if (val === 'increase.end') {
        console.log('increased, top Todo fetching too', val, oldVal, detail);
        topTodos.forceFetchTop();
      }
    });

    return topTodos
  },
  waitFor: ['allTodos']
}


