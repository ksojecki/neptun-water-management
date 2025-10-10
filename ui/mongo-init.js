db.createUser(
  {
    user: "neptun_user",
    pwd: "neptun_password",
    roles: [
      {
        role: "readWrite",
        db: "neptun"
      }
    ]
  }
);

db.createCollection('users', { capped: false });

db.users.insert([
  { "username": "admin", "password": "21232f297a57a5a743894a0e4a801fc3" },
]);
