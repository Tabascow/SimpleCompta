'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;

var DocumentSchema = new Schema({
  name: String,
  comment: String
});
DocumentSchema.plugin(filePlugin, {
  name: "file"
});

module.exports = mongoose.model('Document', DocumentSchema);
