const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-body');
const config = require('config');
const fs = require('fs');
const passport = require('./src/libs/passport/index');
const mongoose = require('mongoose');
const beautifulUnique = require('mongoose-beautiful-unique-validation');
const locale = require('koa-locale');
const i18n = require('koa-i18n');

mongoose.connect(config.get('databaseUrl'), {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.plugin(beautifulUnique);

const app = new Koa();
const router = new Router();

const options = {
  dirs: [__dirname + '/locales', __dirname + '/foo/locales'],
};

locale(app, options);

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

app.use(i18n(app, {
  directory: './config/locales',
  locales: ['ru', 'en'], //  `zh-CN` defualtLocale, must match the locales to the filenames
  modes: [
    'query',                //  optional detect querystring - `/?locale=en-US`
    'subdomain',            //  optional detect subdomain   - `zh-CN.koajs.com`
    'cookie',               //  optional detect cookie      - `Cookie: locale=zh-TW`
    'header',               //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
    'url',                  //  optional detect url         - `/en`
    'tld',                  //  optional detect tld(the last domain) - `koajs.cn`
    function() {}           //  optional custom function (will be bound to the koa context)
  ]
}));

app.use(function (ctx) {
  ctx.body = ctx.i18n.__('any key');
});

app.use(serve(path.join(__dirname, '/public')));

router.use('/', require('./src/routes').routes());

app.use(router.routes());



console.log(config.get('port'));
app.listen(config.get('port'));
