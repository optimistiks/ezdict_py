define(['app'], function (app) {
    'use strict';
    return app.
        constant('constants', {
            'API_URL': '/api',
            'API_FORMAT': '.json',
            'DASHBOARD_PATHNAME': '/home',
            'ROOT_STATE': 'dashboard.layout.default',
            'ENTER_KEYCODE': 13
        });
});
