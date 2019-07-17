const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(views(path.join(__dirname, '/src/templates'), {
  extension: 'njk',
  map: {
    njk: 'nunjucks',
  },
}));

app.use(serve('./public'));

router.use('/', require('./src/routes').routes());

app.use(router.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT);
