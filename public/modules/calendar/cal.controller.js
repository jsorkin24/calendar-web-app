(function () {
    'use strict';
    angular
        .module('app.cal')
        .controller('calController', CalController);

    CalController.$inject = ['calService', "moment", "calendarConfig"] //injecting to avoid minification

    function CalController(calService, moment, calendarConfig) {
        'use strict'
        var vm = this;

        vm.calendarView = 'month';
        vm.viewDate = new Date();
        console.log(vm.events);
        var actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
            onClick: function (args) {
                // alert.show('Edited', args.calendarEvent);
                alert('Edited', args.calendarEvent);

            }
        }, {
            label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            onClick: function (args) {
                // alert.show('Deleted', args.calendarEvent);
                alert('Deleted', args.calendarEvent);

            }
        }];
        vm.events = [];

        vm.cellIsOpen = true;

        vm.addEvent = function () {
            vm.events.push({
                title: 'New event',
                description: 'Description',
                startsAt: moment().startOf('day').toDate(),
                endsAt: moment().endOf('day').toDate(),
                color: calendarConfig.colorTypes.important,
                draggable: true,
                resizable: true
            });
        };

        vm.eventClicked = function (event) {
            alert('Clicked', event);
        };

        vm.eventEdited = function (event) {
            alert('Edited', event);
        };

        vm.eventDeleted = function (event) {
            alert('Deleted', event);
        };

        vm.eventTimesChanged = function (event) {
            alert('Dropped or resized', event);
        };

        vm.toggle = function ($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        vm.timespanClicked = function (date, cell) {

            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }

        };

    }
})();
