var path = require('path');
var falcorKoaRouter = require('falcor-koa-router');

var port = process.env.npm_package_config_port || 8000;

var app = require('rc-tools/lib/server/')();

function wait() {
  return function (done) {
    setTimeout(done, 500);
  }
}

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
todos.forEach(function (t) {
  todosMap[t.id] = t;
});

const router = falcorKoaRouter.routes([
  {
    route: 'todoById[{integers}][{keys}]',
    set: function* (args) {
      yield wait(100);
      var ret = [];
      var todoById = args.todoById;
      for (var id in todoById) {
        var target = todoById[id];
        for (var p in target) {
          todosMap[id][p] = todoById[id][p];
          ret.push({
            path: ['todoById', id, p],
            value: todoById[id][p]
          });
        }
      }
      return ret;
    }
  },
  {
    route: 'actions.increasePriority',
    call: function* (path, args) {
      yield wait(100);
      var id = args[0];
      todosMap[id].priority++;
      return {
        path: ['todoById', id, 'priority'],
        value: todosMap[id].priority
      };
    }
  },
  {
    route: 'todoById[{integers:ids}][{keys:ps}]',
    get(args) {
      var ret = [];
      var ids = args.ids;
      var ps = args.ps;
      ps.forEach(function (p) {
        ids.forEach(function (id) {
          ret.push({
            path: ['todoById', id, p],
            value: todosMap[id][p]
          });
        });
      });
      return ret;
    }
  },
  {
    route: 'todo.top[{ranges:r}]',
    get(args) {
      var ctx = this.ctx;

      var sortedTodos = todos.concat().sort(function (t1, t2) {
        return t2.priority - t1.priority;
      }).slice(args.r[0].from, args.r[0].to + 1);
      var index = args.r[0].from;
      var refs = sortedTodos.map(function (t, i) {
        return {
          path: ['todo', 'top', index++],
          value: {
            $type: 'ref',
            value: ['todoById', t.id]
          }
        };
      });
      var topTodoMaps = sortedTodos.map(function (t) {
        return ({
          path: ['todoById', t.id],
          value: todosMap[t.id]
        })
      });
      //console.log('top',topTodoMaps)

      return (topTodoMaps.concat(refs));
    }
  },
  {
    route: 'todo.bottom[{ranges:r}]',
    get: function *(args) {
      yield wait(100);
      var sortedTodos = todos.concat().sort(function (t1, t2) {
        return t1.priority - t2.priority;
      }).slice(args.r[0].from, args.r[0].to + 1);
      var index = args.r[0].from;
      var refs = sortedTodos.map(function (t, i) {
        return {
          path: ['todo', 'bottom', index++],
          value: {
            $type: 'ref',
            value: ['todoById', t.id]
          }
        }
      });
      var topTodoMaps = sortedTodos.map(function (t) {
        return ({
          path: ['todoById', t.id],
          value: todosMap[t.id]
        })
      });
      //console.log('bottom',topTodoMaps)
      return (topTodoMaps.concat(refs));
    }
  },
  {
    route: 'todo.length',
    get() {
      return ({
        path: ['todo', 'length'],
        value: todos.length
      });
    }
  },
  {
    route: 'todo.default[{ranges:r}]',
    get(args) {
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
      var maps = todos.map(function (t, i) {
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
      return (maps.concat(refs));
    }
  }
]);
app.get('/model.json', router);
app.post('/model.json', router);
app.listen(port);

console.log(`listen at ${port}`);
