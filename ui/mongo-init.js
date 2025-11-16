db.createUser({
  user: 'neptun_user',
  pwd: 'neptun_password',
  roles: [
    {
      role: 'readWrite',
      db: 'neptun',
    },
  ],
});

db.createCollection('settings', { capped: false });

db.settings.insert({ id: 'schema', schemaVersion: 0 });
