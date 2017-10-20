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

    angular.module('app', [
    //3rd party
    'ui.router', 'ui.bootstrap', 'mwl.calendar',
    //layout
    'app.cal', 'app.services']) //modules for app
    .config(RouteConfig).run();

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
                    resolve: {
                        events: getAllEvents
                    }
                }
            }
        });
    }

    function getAllEvents(calService) {
        return calService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
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

    angular.module('app.cal').controller('calController', CalController);

    CalController.$inject = ['events', 'calService', "moment", "calendarConfig"]; //injecting to avoid minification

    function CalController(events, calService, moment, calendarConfig) {
        'use strict';

        var vm = this;

        vm.items = events;

        vm.add = function () {
            calService.insert(vm.item).then(_onSuccess).catch(_onError);
        };

        //Calendar Code
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        var actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
            onClick: function onClick(args) {
                // alert.show('Edited', args.calendarEvent);
                alert('Edited', args.calendarEvent);
            }
        }, {
            label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            onClick: function onClick(args) {
                // alert.show('Deleted', args.calendarEvent);
                alert('Deleted', args.calendarEvent);
            }
        }];

        vm.cellIsOpen = false;

        vm.addEvent = function () {};

        vm.eventClicked = function (event) {
            debugger;
            vm.item = event;
            vm.item.startsAt = new Date(event.startsAt);
            vm.item.endsAt = new Date(event.endsAt);

            // alert('Clicked', event);
        };

        // vm.eventEdited = function (event) {
        //     alert('Edited', event);
        // };

        // vm.eventDeleted = function (event) {
        //     alert('Deleted', event);
        // };

        // vm.eventTimesChanged = function (event) {
        //     alert('Dropped or resized', event);
        // };

        vm.toggle = function ($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        vm.timespanClicked = function (date, cell) {

            if (vm.calendarView === 'month') {
                if (vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day')) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if (vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month')) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }
        };

        function _onSuccess(res) {
            debugger;
            vm.items.push(res.item);
        }

        function _onError(err) {
            console.log('Error: ' + err.errors);
        };
    }
})();
'use strict';

angular.module('app.cal').factory('alert', function ($uibModal) {

    function show(action, event) {
        return $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: function controller() {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    return {
        show: show
    };
});
'use strict';

(function () {
    'use strict';

    angular.module('app.services').factory('calService', CalServiceFactory);

    CalServiceFactory.$inject = ['$http', '$q'];

    function CalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update

        };

        function getAll() {
            return $http.get('/api/calendar').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/calendar/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/calendar', itemData).then(xhrSuccess).catch(onError);
        }

        function update(itemData, onSuccess, onError) {
            return $http.put('/api/calendar/' + itemData._id, itemData).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();