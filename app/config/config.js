require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DMYSQL_USER,
        "password": process.env.DMYSQL_PASSWORD,
        "database": process.env.DMYSQL_DATABASE,
        "host": process.env.DMYSQL_HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DMYSQL_USER,
        "password": process.env.DMYSQL_PASSWORD,
        "database": process.env.DMYSQL_DATABASE,
        "host": process.env.DMYSQL_HOST,
        "dialect": "mysql"
    },
    "production": {
        "dialect": "mysql",
        "use_env_variable": "JAWSDB_URL"
    }
}