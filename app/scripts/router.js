var _ = require('underscore');
var Q = require('q');
var Marionette = require('marionette');

var application = require('./application');
var auth = require('./auth');
var LandingView = require('./views/landing');
var CalendarView = require('./views/calendar');
var LoadingView = require('./views/loading');

module.exports = Marionette.AppRouter.extend({

    routes: {
        'logout'                         : 'logout',
        '*default'                       : 'default'
    },

    logout: function() {
        auth.unAuthorize();
        application.navigate('', {replace: true});
    },

    default: function() {
        application.mainRegion.show(new LoadingView());

        if (auth.isAuthorized()) {
            application.mainRegion.show(new CalendarView());
        } else {
            application.mainRegion.show(new LandingView());
        }
    }
});
