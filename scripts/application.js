define([
    'underscore',
    'marionette',
    'backbone'
],
function (
    _,
    Marionette,
    Backbone
) {
    var application = new Backbone.Marionette.Application();

    application.addRegions({
        mainRegion: '#main'
    });

    return application;
});
