var env = require('./env.json');
exports.config = async function () {
    var node_env = await process.env.NODE_ENV || 'development';
    return env[node_env];
};