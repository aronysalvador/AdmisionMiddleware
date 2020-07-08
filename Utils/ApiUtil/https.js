const https = require('https');

const execHttps = (config) =>{
    return new Promise ((resolve, reject) => {
        let data = ""
        https.get(config, (response) => {
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                resolve(JSON.parse(data))
            });
            response.on('error', function () {
                reject({})
            });
        });
    })
}
module.exports = execHttps