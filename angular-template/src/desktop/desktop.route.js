(function() {
    'use strict';

    angular
        .module('app.desktop')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'desktop',
                config: {
                    url: '/desktop',
                    templateUrl: 'desktop/desktop.html',
                    controller: 'DesktopController',
                    controllerAs: 'vm',
                    title: 'desktop',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Desktop'
                    }
                }
            }
        ];
    }
})();
