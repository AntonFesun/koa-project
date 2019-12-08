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

mongoose.connect(config.get('databaseUrl'), {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.plugin(beautifulUnique);

const app = new Koa();
const router = new Router();

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
//
// app.use(sass({
//   src:  __dirname + '/public/styles/',
//   dest: __dirname + '/public/'
// }));

app.use(serve(path.join(__dirname, '/public')));

router.use('/', require('./src/routes').routes());

app.use(router.routes());

console.log(config.get('port'));
app.listen(config.get('port'));
