const Glasses = require('./models/glasses');
const Order = require('./models/cart');
const fs = require('fs');
const SMS = require('sms_ru');
const sms_id = '992125F5-1FEC-5A10-002A-98230CE716E6 ';
const sms = new SMS(sms_id);

exports.homePage = async (ctx) => {
    const brands = await Glasses.distinct("name");
    await ctx.render('index.pug', {brands});
};

exports.all = async (ctx) => {
    const glasses = await Glasses.find({});
    await ctx.render('all.pug', {glasses});
};

exports.cart = async (ctx) => {
    const items = await Order.find({});
    await ctx.render('orders.pug', {items});
};

exports.cartUser = async (ctx) => {
    await ctx.render('cart-user.pug');
};

exports.menPage = async (ctx) => {
    const glasses = await Glasses.find({sex: 'чоловічі'});
    await ctx.render('men.pug', {glasses})
};

exports.menPageSunglasses = async (ctx) => {
    const glasses = await Glasses.find({sex: 'чоловічі', type: 'сонцезахисні'});
    await ctx.render('men_sunglasses.pug', {glasses});
};

exports.menPageRims = async (ctx) => {
    const glasses = await Glasses.find({sex: 'чоловічі', type: 'оправи'});
    await ctx.render('men_sunglasses.pug', {glasses});
};

exports.womenPage = async (ctx) => {
    const glasses = await Glasses.find({sex: 'жіночі'});
    await ctx.render('women.pug', {glasses});
};

exports.womenPageSunglasses = async (ctx) => {
    const glasses = await Glasses.find({sex: 'жіночі', type: 'сонцезахисні'});
    await ctx.render('women_sunglasses.pug', {glasses});
};

exports.womenPageRims = async (ctx) => {
    const glasses = await Glasses.find({sex: 'жіночі', type: 'оправи'});
    await ctx.render('women_rims.pug', {glasses});
};

exports.adminPage = async (ctx) => {
    const glasses = await Glasses.find({});
    await ctx.render('admin-panel.pug', {
        glasses
    });
};

exports.orders = async (ctx) => {
    const orders = await Order.find({}).populate('glasses');
    console.log(orders);
    await ctx.render('orders.pug', {
        orders
    });
};

exports.allSunglassesPage = async (ctx) => {
    const glasses = await Glasses.find({type: 'сонцезахисні'});
    await ctx.render('allsunglasses.pug', {
        glasses
    });
};

exports.rimsPage = async (ctx) => {
    const glasses = await Glasses.find({type: 'оправи'});
    await ctx.render('rims.pug', {glasses});
};

exports.save = async(ctx) => {
    const body = ctx.request.body;
    const files = ctx.request.files;
    const file_1 = files.foto_1.path.split('/public');
    const file_2 = files.foto_2.path.split('/public');
    const file_3 = files.foto_3.path.split('/public');
    const glasses = new Glasses({
        name: body.name,
        id: body.id,
        type: body.type,
        sex: body.sex,
        shape: body.shape,
        colorOfGlass: body.colorOfGlass,
        gradient: body.gradient,
        lenstype: body.lenstype,
        colorOfFrame: body.colorOfFrame,
        material: body.material,
        price: body.price,
        description: body.description,
        foto_1: file_1[1],
        foto_2: file_2[1],
        foto_3: file_3[1],
        quantity: body.quantity
    });
    await glasses.save();
    ctx.body = {
        success: true
    }
};

exports.makeOrder = async (ctx) => {
  const body = ctx.request.body;
  let glasses = JSON.parse(body.glasses);
  const order = new Order({
      glasses: glasses,
      quantity_item: JSON.parse(body.quantity_item),
      phone: body.phone,
      address: body.address,
      courier: body.courier
  });
  sms.sms_send({
      to: '+380687819308',
      text: 'Магазин: У вас нове замовлення!',
      from: 'ZaGlaza'
  }, (e) => {
      console.log(e.description);
  });
  await order.save();
  ctx.body = {
      success: true
  }
};

exports.singleGlasses = async (ctx) => {
    const id = ctx.params.glassesId ;
    const glass = await Glasses.findById(id);
    await ctx.render('glass.pug', {
        glass
    });
};

exports.brands = async (ctx) => {
    const brands = ctx.params.brands;
    const glasses = await Glasses.find({name: brands});
    await ctx.render('by_brand.pug', {glasses});
};

exports.deleteGlass = async (ctx) => {
    const id = ctx.params.glassesId;
    const glass = await Glasses.findById(id);
    if (fs.existsSync('public' + glass.foto_1)) {
        fs.unlinkSync('public' + glass.foto_1);
    }
    if (fs.existsSync('public' + glass.foto_2)) {
        fs.unlinkSync('public' + glass.foto_2);
    }
    if (fs.existsSync('public' + glass.foto_3)) {
        fs.unlinkSync('public' + glass.foto_3);
    }
    await glass.remove();
    ctx.body = {
        success: true
    };
};

exports.editGlass = async (ctx) => {
    const glasses = await Glasses.findById(ctx.params.glassesId);
    console.log(glasses);
    await ctx.render('edit_glasses.pug', {
        glasses
    })
};

let searchGlasses;

exports.search = async (ctx) => {
    const query = ctx.request.body.request;
    searchGlasses = await Glasses.find({name: {$regex: query, $options: 'i'}});
    ctx.status = 308;
    await ctx.redirect('search');
};

exports.searchPage = async (ctx) => {
    await ctx.render('search.pug', {
        searchGlasses
    });
};

exports.update = async (ctx) => {
    const body = ctx.request.body;
    const id = body.mongoId;
    Glasses.findByIdAndUpdate({_id: id}, {
        $set:{
            name: body.name,
            id: body.id,
            type: body.type,
            sex: body.sex,
            shape: body.shape,
            colorOfGlass: body.colorOfGlass,
            gradient: body.gradient,
            lenstype: body.lenstype,
            colorOfFrame: body.colorOfFrame,
            material: body.material,
            price: body.price,
            description: body.description
    }}, {new: true}, (error, glasses) => {
        if (error) {
            console.log(error);
        } else {
            console.log(glasses);
        }
    });
    ctx.body = {
        success: true
    };
};

exports.signIn = async (ctx) => {
    ctx.body = {
        success: true
    }
};