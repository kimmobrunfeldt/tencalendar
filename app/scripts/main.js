require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        requirejs: '../bower_components/requirejs/require',
        lodash: '../bower_components/lodash/dist/lodash',
        hello: '../bower_components/hello/dist/hello.all'
    },
    shim: {
    }
});

define('modernizr', [], window.Modernizr);

// Define AMD modules here so they are globally available
require(['app', 'jquery', 'modernizr'], function (app, $, Modernizr) {
    app();
});
