var Marionette = require('marionette');
var _ = require('underscore');


var application = new Marionette.Application();

application.addRegions({
    mainRegion: '#main'
});

module.exports = application;
