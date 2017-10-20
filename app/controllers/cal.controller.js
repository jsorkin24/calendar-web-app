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
        insert: insert
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

}