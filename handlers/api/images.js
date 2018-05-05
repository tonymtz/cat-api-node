const express = require('express');
const dataProcessor = require('../../helpers/data-processor');
const goodHttp = require('../../helpers/good-http');
const responseFormatter = require('../../helpers/response-formatter');
const router = express.Router();

const baseUrl = 'http://thecatapi.com';

router.get('/', function (req, res, next) {
    const url = baseUrl +
        '/api/images/get?format=xml&api_key=' +
        req.query.api_key;

    return goodHttp.get(url)
        .then((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.json(responseFormatter.imageResponse(data));
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        })
        .catch((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.json(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        });
});

router.get('/fav', function (req, res, next) {
    const url = baseUrl +
        '/api/images/getfavourites?api_key=' +
        req.query.api_key;

    return goodHttp.get(url)
        .then((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.json(responseFormatter.imageResponse(data));
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        })
        .catch((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.error(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        })
});


router.post('/fav/:imageId', function (req, res, next) {
    const url = baseUrl +
        '/api/images/favourite?image_id=' +
        req.params.imageId +
        '&api_key=' +
        req.query.api_key;

    return goodHttp.get(url, true)
        .then((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    if (data.apierror)
                        res.json(400, data.apierror);
                    else
                        res.json(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        })
        .catch((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.error(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        });
});

router.delete('/fav/:imageId', function (req, res, next) {
    const url = baseUrl +
        '/api/images/favourite?image_id=' +
        req.params.imageId +
        '&action=remove' +
        '&api_key=' +
        req.query.api_key;

    console.log(url);

    return goodHttp.get(url, true)
        .then((response) => {
            console.log(response);
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    if (data.apierror)
                        res.json(400, data.apierror);
                    else
                        res.json(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        })
        .catch((response) => {
            dataProcessor.XMLtoJSON(response)
                .then((data) => {
                    res.error(data);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        });
});

module.exports = router;
