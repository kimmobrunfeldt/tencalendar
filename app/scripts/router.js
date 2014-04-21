define([
    'underscore',
    'marionette',
    'application',
    'auth',
    'views/landing',
    'views/calendar'
], function(
    _,
    Marionette,
    application,
    auth,
    LandingView,
    CalendarView
) {

    return Marionette.AppRouter.extend({

        routes: {
            'logout'                         : 'logout',
            '*default'                       : 'default'
        },

        logout: function() {
            auth.logout();
            application.navigate('', { trigger: false, replace: true });
        },

        default: function() {
            if (auth.isAuthenticated()) {
                application.mainRegion.show(new LandingView());
            } else {
                application.mainRegion.show(new CalendarView());
            }
        }
    });
});
