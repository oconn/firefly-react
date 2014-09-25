var _ = require('lodash'),
    port = 27017,
    dbName = 'mjodev',
    env = process.env.NODE_ENV || 'dev',
    userName = process.env.MJO_MONGODB_USERNAME,
    password = process.env.MJO_MONGODB_PASSWORD,
    ips = [],
    servers = '',
    url = '';

function buildMongoServerString() {
    _.each(ips, function(ip) {
        url += ip.ip + ':' + ip.port + ',';
    });

    return url.slice(0, -1);
}

function buildServerString(url) {
    return url.split(',').join('\n');
}

function buildMongoURL(url) {
    if (env === 'production') {
        url += '/' + dbName;
    } else {
        url += '/' + dbName + '_' + env;
    }
    return 'mongodb://' + userName + ':' + password + '@' + url;
}

switch (env) {
case 'local_development':
    url = 'mongodb://127.0.0.1:27017/' + dbName;
    servers = '127.0.0.1\n';
    break;
// Fallthrough Intended
case 'development':
case 'production': 
    url = buildMongoServerString();
    servers = buildServerString(url);
    url = buildMongoURL(url);
    break;
}

module.exports = {
    url: url,
    servers: servers
};
