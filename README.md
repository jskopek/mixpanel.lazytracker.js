mixpanel.lazytracker.js
=======================

A 'lazy' mixpanel event tracker that handles all events, including those that are triggered during a page change. Proof of concept.

Usage
=====

Include the `mixpanel.lazytracker.js` script at the head of every page. Replace `mixpanel.track` with `track_lazy`. Warning: callbacks are no longer supported.

Example:
--------

    <script type="text/javascript" src="mixpanel.lazytracker.js"></script>
    <script type="text/javascript">
        $("#register").click(function() {
            track_lazy("Registration", {"Account Type": "administrator"});
        });
        $("#cancel").click(function() {
            track_lazy("Registration Canceled");
        });
    </script>
    <form action="/register" method="POST">
        <input type="submit" id="register" name="Register">
        <a href="index.html" id="cancel">Cancel</a>
    </form>
