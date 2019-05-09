
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hubs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('hubs').insert([
        { name: 'api-1' }, // 1
        { name: 'api-2' }, // 2
        { name: 'api-3' }, // 3
        { name: 'api-4' }, // 4
      ]);
    });
};
