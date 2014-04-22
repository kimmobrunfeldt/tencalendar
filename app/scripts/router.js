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
            console.log('logout route')
            auth.logout();
            application.navigate('', { trigger: false, replace: true });
        },

        default: function() {
            console.log('default route')
            application.mainRegion.show(new LoadingView());

            auth.isAuthenticated().then(
                function success() {
                    console.log(auth.isAuthenticated());
                    console.log('User is authenticated')
                    application.mainRegion.show(new CalendarView());
                }, function fail() {
                    console.log('User is not authenticated')
                    application.mainRegion.show(new LandingView());
                }
            );
        }
    });
});
