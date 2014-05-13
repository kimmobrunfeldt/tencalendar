define([
    'underscore',
    'q',
    'marionette',
    'application',
    'auth',
    'views/landing',
    'views/calendar',
    'views/loading'
], function(
    _,
    Q,
    Marionette,
    application,
    auth,
    LandingView,
    CalendarView,
    LoadingView
) {
    return Marionette.AppRouter.extend({

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
});
