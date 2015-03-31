(function() {
    'use strict';

    angular.module('app.core', [
        // Angular modules
        'ngAnimate', 'ngSanitize','ngResource',

        // Our reusable framework
        'fw.exception', 'fw.logger', 'fw.router',

        // 3rd Party modules
        'ui.router'
    ]);
})();
