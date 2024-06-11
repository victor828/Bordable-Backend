export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  role: string;
  createat: string;
  updateat: string;
  position: string;
};

export type user = Omit<User, "id">;

export type Boards = {
  id: string;
  userid: string;
  title: string;
  color: string;
  createdate: string;
  updatedate: string;
  position: string;
};

export type boards = Omit<Boards, "id">;

export type Tables = {
  id: string;
  boardid: string;
  title: string;
  color: string;
  createdate: string;
  updatedate: string;
  position: string;
};

export type tables = Omit<Tables, "id">;

export type Cards = {
  id: string;
  tableid: string;
  title: string;
  createdate: string;
  updatedate: string;
  position: string;
};

export type cards = Omit<Cards, "id">;
