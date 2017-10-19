/* global $ angular */
'use strict';

$(function () {
    // moment.js default language
    // moment.locale('en')

    angular.bootstrap(document, ['app']);
});
'use strict';

(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'app.cal', 'app.services']).config(RouteConfig).run();

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.cal', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app", {
            url: "/",
            // abstract: true,
            views: {
                root: {
                    templateUrl: 'public/modules/calendar/layout.html',
                    controller: 'calController as calCtrl',
                    resolve: {}
                }
            }
        });
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.services', []);
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.services').factory('calService', CalServiceFactory);

    CalServiceFactory.$inject = ['$http', '$q'];

    function CalServiceFactory($http, $q) {
        return {
            insert: insert
        };

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/calendar', itemData).then(xhrSuccess).catch(onError);
        }
    }
})();