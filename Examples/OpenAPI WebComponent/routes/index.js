const express = require('express'),
    router = express.Router(),
    request = require('request'),
    path = require('path');

/**
 * fetching air temperature, wind and weather data from opendata api end-points
 * @param {*} parameter 
 * @param {*} station 
 * @param {*} period 
 */
function openDataApiCall(parameter, station, period, callback) {
    const apiUrl ='https://opendata-download-metobs.smhi.se/api/version/1.0';
    request({
        uri: apiUrl + `/parameter/${parameter}/station/${station}/period/${period}/data.json`,
        json: true
    }, (error, response, body) => {
        if (error) {
            return callback(error);
        }
        try {
            if (!error && response.statusCode === 200) {
                callback(null, body);
            }
        } catch(err) {
            callback(err);
        }
    });
}

/**
 * Default route for the homepage
 */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index1.html'));
});

/**
 * Route to get latest wind speed data for stockholm
 */
router.get('/wind-speed', (req, res, next) => {
    openDataApiCall(4, 98210, 'latest-day', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Wind speed: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Wind speed: </span></strong><span>NA</span>');
        }
    });
});

/**
 * Route to get latest wind direction data for stockholm
 */
router.get('/wind-direction', (req, res, next) => {
    openDataApiCall(3, 98210, 'latest-day', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Wind direction: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Wind direction: </span></strong><span>NA</span>');
        }
    });
});

/**
 * Route to get latest sunshine time data for stockholm
 */
router.get('/sunshine-time', (req, res, next) => {
    openDataApiCall(10, 98735, 'latest-day', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Sunshine time: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Sunshine time: </span></strong><span>NA</span>');
        }
    });
});

/**
 * Route to get latest weather data for stockholm
 */
router.get('/weather', (req, res, next) => {
    openDataApiCall(13, 98210, 'latest-day', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Weather: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Weather: </span></strong><span>NA</span>');
        }
    });
});

/**
 * Route to get latest humidity data for stockholm
 */
router.get('/humidity', (req, res, next) => {
    openDataApiCall(6, 98210, 'latest-months', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Humidity: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Humidity: </span></strong><span>NA</span>');
        }
    });
});

/**
 * Route to get latest air temperature for stockholm
 */
router.get('/air-temperature', (req, res, next) => {
    openDataApiCall(22, 98210, 'latest-months', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        if (result.value) {
            res.send('<strong><span>Air temperature: </span></strong><span>' + result.value[result.value.length - 1].value + ' ' + result.parameter.unit + '</span>');
        } else {
            res.send('<strong><span>Air temperature: </span></strong><span>NA</span>');
        }
    });
});

module.exports = router;