(function () {
    'use strict';
    angular
        .module('app', [
            //3rd party
            'ui.router',
            'ui.bootstrap',
            'mwl.calendar',
            //layout
            'app.cal',
            'app.services',
        ]) //modules for app
        .config(RouteConfig)
        .run()

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        RouteConfig.$inject = [
            "$stateProvider",
            "$urlRouterProvider",
            "$locationProvider"
        ];
    }
})();