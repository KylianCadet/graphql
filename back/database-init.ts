import knex, { Knex } from "knex";
import { DB_NAME } from "./const";

export const init = async (knex: Knex) => {
  await knex.schema.createTable('user', (t) => {
    t.increments('id').primary().notNullable();
    t.string('name').notNullable();
  });

  await knex.schema.createTable('photo', (t) => {
    t.increments('id').primary().notNullable();
    t.string('data').notNullable();
    t.integer('user_id').index().notNullable();
    t.foreign('user_id').references('user.id');
  });

  for (let i = 0; i < 10; i += 1) {
    await knex.table('user').insert({
      id: i,
      name: String(i)
    })
    console.log(i)
    for (let j = 0; j < 3; j += 1) {
      console.log(j)
      await knex.table('photo').insert({
        user_id: i,
        data: String(j)
      })
    }
  }
}

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: DB_NAME,
  },
  useNullAsDefault: true
});


init(db).then(() => process.exit(0));