var mongoose = require('mongoose');

// Page Schema
var PageSchema = mongose.Shcema({

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
