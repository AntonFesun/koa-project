const Router = require('koa-router');
const ctrl = require('./controllers');
const validator = require('./validator');

const router = new Router();

router.get('fesunAdmin', ctrl.adminPage);
router.get('adminCart', ctrl.adminCart);

router.get('', ctrl.homePage);
router.get('all', ctrl.all);
router.get('men', ctrl.menPage);
router.get('men/sunglasses', ctrl.menPageSunglasses);
router.get('women', ctrl.womenPage);
router.get('women/sunglasses', ctrl.womenPageSunglasses);
router.get('sunglasses', ctrl.allSunglassesPage);
router.get('rims', ctrl.rimsPage);
router.get('cartAdmin', ctrl.cart);

router.get('glasses/:glassesId', ctrl.singleGlasses);
router.get('brands/:brands', ctrl.brands);

router.get('cart', ctrl.cartUser);

router.post('glass', validator.downloadValidator, ctrl.save);
router.post('order', ctrl.order);

router.delete('deleteGlass/:glassesId', ctrl.deleteGlass);
router.put('editGlass/:glassesId', ctrl.editGlass);

module.exports = router;

