var mongose = require('mongose');

// Page Schema
var PageSchema = mongose.Schema({

  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number
  },
});

var Page = module.exports = mongose.model('Page', PageSchema);
