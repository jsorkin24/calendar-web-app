(function () {
    'use strict'
    angular
        .module('app.cal', ['ui.router'])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app", {
                url: "/",
                // abstract: true,
                views: {
                    root: {
                        templateUrl: 'public/modules/calendar/layout.html',
                        controller: 'calController as calCtrl',
                        resolve: {
                        }
                    }
                }
            })
    }

})();