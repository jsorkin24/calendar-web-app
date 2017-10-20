const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/calendar'
const calModel = require('../models/cal')
const calService = require('../services/cal.service')({
    calModelService: calModel
})

module.exports = calController

function calController() {
    return {
        getAll: getAll,
        getOneById: getOneById,
        insert: insert,
        updateById: updateById,
        removeById: removeById

    }

    function getAll(req, res) {
        calService
            .getAll(req, res)
            .then(events => {
                const responseModel = new responses.ItemsResponse();
                responseModel.items = events;
                res.json(responseModel);
            })
            .catch(err => {
                res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };

        calService
            .getOne(queryCondition)
            .then(events => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = events;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function insert(req, res) {
        calService
            .insert(req.body)
            .then(events => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = events;
                res
                    .status(201)
                    .location(path.join(apiPrefix, events._id.toString()))
                    .json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };
        calService
            .updateOne(queryCondition, req.body)
            .then(events => {
                const responseModel = new responses.ItemResponse();
                res.status(204).json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err.stack));
            });
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };
        calService
            .removeOne(queryCondition)
            .then(events => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = events;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }


}