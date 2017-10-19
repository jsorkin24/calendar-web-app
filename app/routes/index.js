const router = require("express").Router();
const sitesRoutes = require("./sites.routes");
const calRoutes = require("./cal.routes");


router.use('/api/calendar', calRoutes);

// Handle API 404
router.use("/api/*", function (req, res, next) {
    res.sendStatus(404);
});

router.use(sitesRoutes);

router.use(function (err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
        return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.sendStatus(500);
});

module.exports = router;