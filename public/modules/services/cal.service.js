(function () {
    'use strict'

    angular.module('app.services')
        .factory('calService', CalServiceFactory)

    CalServiceFactory.$inject = ['$http', '$q']

    function CalServiceFactory($http, $q) {
    }
})();