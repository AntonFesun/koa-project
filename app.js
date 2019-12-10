const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-body');
const config = require('config');
const passport = require('./src/libs/passport/index');
const mongoose = require('mongoose');
const beautifulUnique = require('mongoose-beautiful-unique-validation');
const i18n = require('koa-i18n');
const locale = require('koa-locale');
const convert = require('koa-convert');
mongoose.connect(config.get('databaseUrl'), {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.plugin(beautifulUnique);

const app = new Koa();
const router = new Router();

locale(app);

app.use(i18n(app, {
  directory: './config/locales',
  locales: ['ua', 'ru'],
  modes: [
    'query'
  ]
}));

app.use(passport.initialize());

app.use(views(path.join(__dirname, '/src/templates'), {
  extension: 'pug',
  map: {
    pug: 'pug'
  },
}));

app.use(bodyParser({
  formidable:{
    uploadDir: path.join( __dirname, '/public/assets/db_images'),
    keepExtensions: true
  },
  multipart: true,
  urlencoded: true,
}));

app.use(serve(path.join(__dirname, '/public')));

router.use('/', require('./src/routes').routes());

app.use(router.routes());

app.listen(config.get('port'));
