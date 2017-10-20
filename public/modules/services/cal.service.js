(function () {
    'use strict'

    angular.module('app.services')
        .factory('calService', CalServiceFactory)

    CalServiceFactory.$inject = ['$http', '$q']

    function CalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            insert: insert
        }

        function getAll() {
            return $http.get('/api/calendar')
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/calendar', itemData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data)
        }
    }
})();