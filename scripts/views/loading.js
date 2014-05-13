define([
    'underscore',
    'marionette',
    'templatehelpers',
    'text!templates/loading.html'
], function (
    _,
    Marionette,
    templateHelpers,
    loadingTemplate
) {
    return Marionette.ItemView.extend({
        template: _.template(loadingTemplate),
        templateHelpers: templateHelpers,
    });
});
