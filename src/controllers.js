exports.homePage = async (ctx) => {
    await ctx.render('index.njk');
};

exports.menPage = async (ctx) => {
    await ctx.render('men.njk')
};

exports.womenPage = async (ctx) => {
    await ctx.render('women.njk')
};

exports.allSunglassesPage = async (ctx) => {
    await ctx.render('allsunglasses.njk')
};
exports.rimsPage = async (ctx) => {
    await ctx.render('rims.njk')
};