var mongoose = require('mongoose');
var OrderSchema = mongoose.Schema({
  Region: { type: String },
  Country: { type: String },
  manufacturer: { type: String },
  'Item Type': { type: String },
  'Sales Channel': { type: String },
  'Order Priority': { type: String },
  'Order Date': { type: String },
  'Order ID': { type: Number },
  'Ship Date': { type: Date },
  'Units Sold': { type: Number },
  'Unit Price': { type: Number },
  'Unit Cost': { type: Number },
  'Total Revenue': { type: Number },
  'Total Cost': { type: Number },
  'Total Profit': { type: Number }
});

const Order = (module.exports = mongoose.model('order', OrderSchema));
module.exports.addResults = results => {
  Order.insertMany(results, function(err, res) {
    if (err) throw err;
    console.log('Number of documents inserted: ' + res.insertedCount);
  });
};
