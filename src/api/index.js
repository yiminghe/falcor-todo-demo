import model from './model';
import falcor from 'falcor/dist/falcor.browser';

export async function increasePriority(id) {
  return model.call('actions.increasePriority', [id]).then(d => {
    return {
      id,
      ...d.json.todoById[id],
    };
  });
}

export async function fetch(pageNum = 1, pageSize = 2, type) {
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize - 1;
  return model.get(`todo.${type}[${start}..${end}]["name","done","id","priority"]`, 'todo.length')
    .then((d) => {
      const data = [];
      const ret = d.json.todo[type];
      const total = d.json.todo.length;
      falcor.keys(ret).forEach((k) => {
        data.push(ret[k]);
      });
      return {
        data,
        pageNum,
        pageSize,
        total,
      };
    });
}

export async function forceFetch(pageNum, pageSize, type) {
  model.invalidate(`todo.${type}`);
  return fetch(pageNum, pageSize, type);
}
