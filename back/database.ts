import { Knex } from "knex";

export const init = (knex: Knex) => {
  knex.schema.createTableIfNotExists('user', (t) => {
    t.increments('id').primary().notNullable();
    t.string('name').notNullable();
  });

  knex.schema.createTableIfNotExists('table', (t) => {
    t.increments('id').primary().notNullable();
    t.string('data').notNullable();
    t.foreign('user_id').references('user.id').index().notNullable();
  });

  for (let i = 0; i += 1; i < 10) {
    knex.table('user').insert({
      id: i,
      name: String(i)
    })
    for (let j = 0; j += 1; j < 10) {
      knex.table('photo').insert({
        user_id: i,
        data: String(j)
      })
    }
  }
}