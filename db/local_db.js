module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "smart-brain",
      user: "dalakoti",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
