(function () {
    'use strict';
    angular
        .module('app.cal')
        .controller('calController', CalController);

    CalController.$inject = ['events', 'calService', "moment", "calendarConfig"] //injecting to avoid minification

    function CalController(events, calService, moment, calendarConfig) {
        'use strict'
        var vm = this;

        vm.items = events;

        vm.add = () => {
            calService.insert(vm.item)
                .then(_onSuccess)
                .catch(_onError)
        }

        vm.delete = (id) => {
            debugger;
            calService.remove(id)
                .then(_onDeleteSuccess)
                .catch(_onError)
        }

        function _onDeleteSuccess() {
            //will splice out object from array of events
            // debugger;
            // let eventList = vm.items;
            // let removeIndex = eventList.findIndex(
            //     (element, index, eventList) => {
            //         return element._id === data.item._id;
            //     }
            // );
            // eventList.splice(removeIndex, 1);
        }
        //Calendar Code
        vm.calendarView = 'month';
        vm.viewDate = new Date();
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


        vm.cellIsOpen = false;

        vm.addEvent = function () {


        };

        vm.eventClicked = function (event) {
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


        function _onSuccess(res) {
            vm.items.push(res.item);
        }

        function _onError(err) {
            console.log(`Error: ${err.errors}`);
        };



    }
})();
