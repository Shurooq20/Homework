// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "teamviewer",
    },
  
    migrations: {
      tableName: "migrations",
      directory: "./db/migrations"
    }
  }
};
