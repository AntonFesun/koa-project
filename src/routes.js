const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('home', ctrl.homePage);
router.get('men', ctrl.menPage);
router.get('women', ctrl.womenPage);
router.get('allsunglasses', ctrl.allSunglassesPage);
router.get('rims', ctrl.rimsPage);

module.exports = router;

