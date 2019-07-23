const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-body');
const config = require('config');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect(config.get('databaseUrl'), {
  useNewUrlParser: true
});

const app = new Koa();
const router = new Router();

app.use(bodyParser({
  multipart: true,
}));

app.use(views(path.join(__dirname, '/src/templates'), {
  extension: 'pug',
  map: {
    pug: 'pug',
  },
}));

app.use(serve('./public'));

router.use('/', require('./src/routes').routes());

app.use(router.routes());
console.log(config.get('port'));
app.listen(config.get('port'));