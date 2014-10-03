var dbName = 'template';

var mongodbServers = [
    {
        ip: '127.0.0.1',
        port: 27017
    }
];

module.exports = {
    dbPort: 27017,
    dbName: dbName,
    dbServers: mongodbServers,
    dbUserName: process.env[dbName.toUpperCase() + '_MONGODB_USERNAME'],
    dbPassword: process.env[dbName.toUpperCase() + '_MONGODB_PASSWORD']
};

/* **** ENVIRONMENT VARIABLES **** /
 *
 *  MONGODB
 *      - password:  'DBNAME' + _MONGODB_PASSWORD
 *      - username:  'DBNAME' + _MONGODB_USERNAME
 *
 *  NODE
 *      - env:  NODE_ENV  
 *          default: development
 *          options: 
 *              local_development
 *              development
 *              production
 *  
 *      - port: NODE_PORT
 *          default: 8000
 *      
 * ****************************** */

