const express = require('express'),
    router = express.Router(),
    request = require('request'),
    db = require('../mongo');
const apiUrl ='https://opendata-download-metobs.smhi.se/api/version/1.0';

router.get('/wind-speed/latest-day', (req, res) => {
    try {
        request({
            uri: apiUrl + '/parameter/4/station/98210/period/latest-day/data.json',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                console.log(body);
                // res.json(body);
                let collection = db.opendata.collection('WindSpeed')
                collection.insert(body, (err, res) => {
                    if (err) throw err;
                    console.log('saved wind speed data')
                    db.close();
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;