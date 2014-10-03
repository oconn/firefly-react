var config = require('./master');

var servers = config.dbServers,
    dbName = config.dbName,
    userName = config.dbUserName,
    password = config.dbPassword,
    url; 

function buildMongoServerString() {
    servers.forEach(function(server) {
        url += server.ip + ':' + server.port + ',';
    });

    return url.slice(0, -1);
}

function buildServerString(url) {
    return url.split(',').join('\n');
}

function buildMongoURL(url) {
    __env === 'production' ?
        url += '/' + dbName :
        url += '/' + dbName + '_' + __env;
    
    return 'mongodb://' + userName + ':' + password + '@' + url;
}

switch (__env) {
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

