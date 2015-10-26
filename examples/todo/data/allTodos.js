import Todos from '../types/Todos';

export default function allTodoDefine() {
  var allTodos = new Todos([]);

  allTodos.on('change', function (val, oldVal, detail) {
    if (val === 'increase.end') {
      console.log('increased, all Todo fetching too', val, oldVal, detail);
      allTodos.fetchAll(allTodos.pageNum);
    }
  });

  return allTodos;
}
