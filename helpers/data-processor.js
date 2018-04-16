const parseString = require('xml2js').parseString;
const Promise = require('bluebird');
const dataProcessor = {};

dataProcessor.XMLtoJSON = (data) => {
    return new Promise((resolve, reject) => {
        parseString(data, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result.response);
        });
    });
};

module.exports = dataProcessor;
