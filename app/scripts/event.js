define([
    'underscore'
], function(
    _
) {
    // Calendar event object
    var Event = function Event(event, opts) {
        var defaultOpts = {
        };

        this.opts = _.extend(defaultOpts, opts);

        this.summary = event.summary;
        this.location = event.location;

        // start and end are moment objects
        this.start = event.start;
        this.end = event.end;
    };

    return Event;
});
