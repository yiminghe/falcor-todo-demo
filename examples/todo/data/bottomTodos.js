import Todos from '../types/Todos';

export default {
  init: function bottomTodoDefine(allTodos) {
    var topTodos = new Todos([]);

    allTodos.on('change', function updateTopTodos(val, oldVal, detail) {
      if (val === 'increase.end') {
        console.log('increased, bottom Todo fetching too', val, oldVal, detail);
        topTodos.forceFetchBottom();
      }
    });

    return topTodos
  },
  waitFor: ['allTodos']
}
