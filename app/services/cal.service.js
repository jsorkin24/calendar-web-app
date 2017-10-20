module.exports = calService

function calService(options) {
    let event
    if (!options.calModelService) {
        throw new Error('Options.modelService is required')
    }

    Event = options.calModelService

    return {
        getAll: getAll,
        // getOne: getOne,
        insert: insert
        // updateOne: updateOne,
        // removeOne: removeOne
    }

    function getAll(req, res) {
        let events = Event.find()
        if (req.query.active) {
            notes.where('isArchived').eq(false)
        }
        return events;
    }

    function insert(document) {
        let event = new Event(document)
        return event.save()
    }


}
