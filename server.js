var path = require('path');
var staticDir = path.join(__dirname, 'static');
var app = require('rc-server')();
var FalcorRouter = require('falcor-router');
var falcorKoa = require('falcor-koa');
var todos = [
  {
    id: '1',
    priority: 1,
    name: "1",
    done: false,
  },
  {
    id: '2',
    priority: 2,
    name: "2",
    done: false,
  },
  {
    id: '3',
    priority: 8,
    name: "3",
    done: false,
  },
  {
    id: '4',
    priority: 6,
    name: "4",
    done: false,
  }, {
    id: '5',
    priority: 3,
    name: "5",
    done: false,
  }
];

var todosMap = {};
todos.forEach((t)=> {
  todosMap[t.id] = t;
});

var router = new FalcorRouter([
  {
    route: 'todo.top[{ranges:r}]',
    get(args) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var sortedTodos = todos.concat().sort((t1, t2)=> {
            return t2.priority - t1.priority;
          }).slice(args.r[0].from, args.r[0].to + 1);
          var index = args.r[0].from;
          var refs = sortedTodos.map((t, i)=> {
            return {
              path: ['todo', 'top', index++],
              value: {
                $type: 'ref',
                value: ['todoById', t.id]
              }
            }
          });
          var topTodoMaps = sortedTodos.map((t)=> {
            return ({
              path: ['todoById', t.id],
              value: todosMap[t.id]
            })
          });
          //console.log('top',topTodoMaps)

          resolve(topTodoMaps.concat(refs));
        }, 100);
      });
    }
  },
  {
    route: 'todo.bottom[{ranges:r}]',
    get(args) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var sortedTodos = todos.concat().sort((t1, t2)=> {
            return t1.priority - t2.priority;
          }).slice(args.r[0].from, args.r[0].to + 1);
          var index = args.r[0].from;
          var refs = sortedTodos.map((t, i)=> {
            return {
              path: ['todo', 'bottom', index++],
              value: {
                $type: 'ref',
                value: ['todoById', t.id]
              }
            }
          });
          var topTodoMaps = sortedTodos.map((t)=> {
            return ({
              path: ['todoById', t.id],
              value: todosMap[t.id]
            })
          });
          //console.log('bottom',topTodoMaps)
          resolve(topTodoMaps.concat(refs));
        }, 100);
      });
    }
  },
  {
    route: 'todo.default[{ranges:r}]',
    get(args) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var refs = todos.map(function (t, i) {
            if (i > args.r[0].to || i < args.r[0].from) {
              return null;
            }
            return {
              path: ['todo', 'default', i],
              value: {
                $type: 'ref',
                value: ['todoById', t.id]
              }
            };
          }).filter(function (v) {
            return !!v
          });
          var maps = todos.map((t, i)=> {
            if (i > args.r[0].to || i < args.r[0].from) {
              return null;
            }
            return {
              path: ['todoById', t.id],
              value: todosMap[t.id]
            };
          }).filter(function (v) {
            return !!v
          });
          //console.log('default',maps)
          resolve(maps.concat(refs));
        }, 100);
      });
    }
  }]);

app.get('/model.json', falcorKoa.dataSourceRoute(router));

app.listen(9001);

console.log('listening at: 9001');
