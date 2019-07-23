const Router = require('koa-router');
const ctrl = require('./controllers');
const validator = require('./validator');

const router = new Router();

router.get('', ctrl.homePage);
router.get('men', ctrl.menPage);
router.get('women', ctrl.womenPage);
router.get('allsunglasses', ctrl.allSunglassesPage);
router.get('rims', ctrl.rimsPage);
router.get('fesunAdmin', ctrl.adminPage);

router.get('glasses/:glassesId', ctrl.singleGlasses);

router.post('glass', validator.downloadValidator, ctrl.glass);
router.delete('deleteGlass/:glassesId', ctrl.deleteGlass);
router.put('editGlass/:glassesId', ctrl.editGlass);

module.exports = router;

