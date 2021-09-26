exports.up = function (knex, Promise) {
  return knex.schema.createTable("login", (table) => {
    table.string("hash");
    table.string("email");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("login");
};
