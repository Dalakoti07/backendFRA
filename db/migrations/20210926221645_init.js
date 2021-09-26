exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.string("name");
    table.string("email");
    table.date("joined");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
