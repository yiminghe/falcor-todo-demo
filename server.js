var path = require('path');
var staticDir = path.join(__dirname, 'static');
var app = require('koa')();
var FalcorRouter = require('falcor-router');
var falcorKoa = require('./server/falcor-koa');
var mount = require('koa-mount');
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

var BaseRouter = FalcorRouter.createClass([
  {
    route: 'todoById[{integers}][{keys}]',
    set(args) {
      return new Promise(function (resolve) {
        setTimeout(function () {
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
          resolve(ret);
        }, 100);
      });
    }
  },
  {
    route: 'actions.increasePriority',
    call(path, args){
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
      return new Promise(function (resolve) {
        setTimeout(function () {
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
          resolve(ret);
        }, 100);
      });
    }
  },
  {
    route: 'todo.top[{ranges:r}]',
    get(args) {
      var ctx = this.ctx;
      return new Promise(function (resolve) {
        setTimeout(function () {
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
            }
          });
          var topTodoMaps = sortedTodos.map(function (t) {
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
          resolve(topTodoMaps.concat(refs));
        }, 100);
      });
    }
  },
  {
    route: 'todo.length',
    get(args) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            path: ['todo', 'length'],
            value: todos.length
          });
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
          resolve(maps.concat(refs));
        }, 100);
      });
    }
  }
]);

var MyRouter = function (ctx) {
  BaseRouter.call(this);
  this.ctx = ctx;
};

MyRouter.prototype = Object.create(BaseRouter.prototype);

app.use(require('koa-body')());
app.use(mount('/model.json', falcorKoa.dataSourceRoute(function *(next) {
  return new MyRouter(this);
})));

require('rc-server')(app);
app.listen(9001);

console.log('listening at: 9001');
