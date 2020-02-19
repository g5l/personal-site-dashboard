module.exports = (app, db) => {
  app.get('/product', (req, res) => {
    console.log(db.Product.findAll());
    // db.product.findAll().then( (result) => res.json(result) )
  });
}