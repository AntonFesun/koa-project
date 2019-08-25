const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');
const validator = require('./validator');

const router = new Router();

router.get('signUpPage', ctrl.signUpPage);
router.get('signInPage', ctrl.signInPage);

router.post('signin', ctrl.signIn);
router.post('signup', ctrl.signUp);

router.get('adminPanel', passport.authenticate('jwt', {session: false}), ctrl.adminPage);
router.get('orders', passport.authenticate('jwt', {session: false}), ctrl.orders);

router.get('', ctrl.homePage);
router.get('all', ctrl.all);

router.get('men', ctrl.menPage);
router.get('men/sunglasses', ctrl.menPageSunglasses);
router.get('men/rims', ctrl.menPageRims);

router.get('women', ctrl.womenPage);
router.get('women/sunglasses', ctrl.womenPageSunglasses);
router.get('women/rims', ctrl.womenPageRims);

router.get('sunglasses', ctrl.allSunglassesPage);
router.get('rims', ctrl.rimsPage);
router.get('cartAdmin', ctrl.cart);

router.get('glasses/:glassesId', ctrl.singleGlasses);
router.get('brands/:brands', ctrl.brands);

router.get('cart', ctrl.cartUser);

router.get('editGlass/:glassesId', ctrl.editGlass);

router.post('glass', passport.authenticate('jwt', {session: false}), validator.downloadValidator, ctrl.save);
router.post('order', ctrl.makeOrder);
router.post('find', ctrl.search);
router.get('search', ctrl.searchPage);

router.delete('deleteGlass/:glassesId', passport.authenticate('jwt', {session: false}), ctrl.deleteGlass);
router.put('edit', passport.authenticate('jwt', {session: false}), ctrl.update);

module.exports = router;