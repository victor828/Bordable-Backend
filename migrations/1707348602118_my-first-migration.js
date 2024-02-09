exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    username: { type: "varchar(50)", unique: true, notNull: true },
    name: { type: "varchar(255)" },
    email: { type: "varchar(20)", unique: true },
    password: { type: "varchar(255)", notNull: true },
    role: {
      type: "varchar(10)",
      default: "'admin'",
      check: "\"role\" IN ('user', 'admin')",
    },
    createdate: { type: "timestamp", default: pgm.func("current_timestamp") },
    updatedate: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createTable("boards", {
    id: { type: "serial", primaryKey: true },
    userid: { type: "integer" },
    title: { type: "varchar(255)", notNull: true },
    color: {
      type: "varchar(7)",
      default: "#E2E8F0",
      check:
        "\"color\" IN ('#E2E8F0', '#FECACA', '#FED7AA', '#FEF08A', '#D9F99D', '#BFDBFE', '#FBCFE8', '#DDD6FE')",
    },
    createdate: { type: "timestamp", default: pgm.func("current_timestamp") },
    updatedate: { type: "timestamp", default: pgm.func("current_timestamp") },
    position: { type: "integer" },
  });

  pgm.createTable("tables", {
    id: { type: "serial", primaryKey: true },
    boardid: { type: "integer" },
    title: { type: "varchar(50)", notNull: true },
    createdate: { type: "timestamp", default: pgm.func("current_timestamp") },
    updatedate: { type: "timestamp", default: pgm.func("current_timestamp") },
    position: { type: "integer" },
    boardid_fk: {
      type: "integer",
      references: '"boards"',
      notNull: false,
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("cards", {
    id: { type: "serial", primaryKey: true },
    tableid: { type: "integer" },
    title: { type: "varchar(200)", notNull: true },
    createdate: { type: "timestamp", default: pgm.func("current_timestamp") },
    updatedate: { type: "timestamp", default: pgm.func("current_timestamp") },
    position: { type: "integer" },
    tableid_fk: {
      type: "integer",
      references: '"tables"',
      notNull: false,
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("cards");
  pgm.dropTable("tables");
  pgm.dropTable("boards");
  pgm.dropTable("users");
};
