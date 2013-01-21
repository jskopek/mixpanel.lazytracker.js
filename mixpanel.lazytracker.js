function initialize_lazy_tracker() {
    $.cookie.json = true;
    var events = $.cookie("lazy_tracker_events");
    if( events && events.length && !window.lazy_tracker_send_lock ) {
        var evt = events[0];

        // track that an event is being sent to prevent `initialize_lazy_tracker` from sending duplicates
        window.lazy_tracker_send_lock = true;

        // track the event in FIFO pattern
        console.log("tracking", evt.event_name, evt.properties);
        mixpanel.track(evt.event_name, evt.properties, function() {

            // remove the first (this) event
            var events = $.cookie("lazy_tracker_events");
            events.splice(0,1);
            $.cookie("lazy_tracker_events", events);

            // mark that we are free to send another track event
            window.lazy_tracker_send_lock = false;

            // rinse, repeat
            initialize_lazy_tracker();
        });
    } else {
        window.lazy_tracker_active = false;
    }
}

function track_lazy(event_name, properties) {
    $.cookie.json = true;
    var events = $.cookie("lazy_tracker_events") || [];
    events.push({
        "event_name": event_name,
        "properties": properties
    });

    // store the events
    $.cookie("lazy_tracker_events", events);

    // wait a second, then track the event; this is to prevent events from even being started
    // when an immediate page change will occur
    setTimeout(initialize_lazy_tracker, 1000);
}

// start
initialize_lazy_tracker();