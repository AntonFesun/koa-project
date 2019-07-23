const Glasses = require('./models/glasses');

exports.homePage = async (ctx) => {
    await ctx.render('index.pug');
};

exports.menPage = async (ctx) => {
    await ctx.render('men.pug')
};

exports.womenPage = async (ctx) => {
    await ctx.render('women.pug')
};

exports.adminPage = async (ctx) => {
    const glasses = await Glasses.find({});
    await ctx.render('admin-panel.pug', {
        glasses
    });
};

exports.allSunglassesPage = async (ctx) => {
    const glasses = await Glasses.find({name: 'Chopard'});
    console.log(glasses);
    await ctx.render('allsunglasses.pug', {
        glasses
    })
};
exports.rimsPage = async (ctx) => {
    await ctx.render('rims.pug')
};
exports.glass = async(ctx) => {
    console.log(ctx.request.body);
    const body = ctx.request.body;
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
        quantity: body.quantity
    });
    await glasses.save();
    ctx.body = {
        success: true
    }
};

exports.singleGlasses = async (ctx) => {
    console.log(ctx.params);
    const id = ctx.params.glassesId ;
    const glass = await Glasses.findById(id);
    await ctx.render('glass', {
        glass
    });

};

exports.deleteGlass = async (ctx) => {
    const id = ctx.params.glassesId;
    const glass = await Glasses.findById(id);
    await glass.remove();
    ctx.body = {
        success: true
    };
};

exports.editGlass = async (ctx) => {
  console.log(ctx);
};