CREATE TABLE "users" (
  "id" serial,
  "username" varchar(50) unique not null,
  "name" varchar(255) ,
  "email" varchar(20)  unique,
  "password" varchar(255) not null,
  "role" varchar(10) enum("user", "admin") default 'admin',
  "createdate" date DEFAULT CURRENT_DATE,
  "updatedate" date DEFAULT CURRENT_DATE,
  PRIMARY KEY ("id")
);

CREATE TABLE "Boards" (
  "id" serial,
  "userid" int,
  "title" varchar(255) not null,
  "color" varchar(7) default "#E2E8F0" CHECK ("color" IN ("#E2E8F0", "#FECACA", "#FED7AA", "#FEF08A", "#D9F99D" , "#BFDBFE", "#FBCFE8", "#DDD6FE") ),
  "createdate" date DEFAULT CURRENT_DATE,
  "updatedate" date DEFAULT CURRENT_DATE,
  "position" int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_Boards.userid"
    FOREIGN KEY ("userid")
      REFERENCES "users"("id")
);

CREATE TABLE "tables" (
  "id" serial,
  "boardid" int,
  "title" varchar(50) not null,
  "createdate" date DEFAULT CURRENT_DATE,
  "updatedate" date DEFAULT CURRENT_DATE,
  "position" int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_tables.boardid"
    FOREIGN KEY ("boardid")
      REFERENCES "Boards"("id")
);

CREATE TABLE "cards" (
  "id" serial,
  "tableid" int,
  "title" varchar(200) not null,
  "createdate" date DEFAULT CURRENT_DATE,
  "updatedate" date DEFAULT CURRENT_DATE,
  "position" int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_cards.tableid"
    FOREIGN KEY ("tableid")
      REFERENCES "tables"("id")
);

