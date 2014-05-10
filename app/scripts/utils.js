define([
    'underscore'
], function(
    _
) {
    var exports = {};

    exports.defaultParameter = function(value, defaultValue) {
        if (_.isUndefined(value)) {
            return defaultValue;
        }

        return value;
    };

    return exports;
});


