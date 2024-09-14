declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
  }

  interface Photo {
    id: number;
    user_id: number;
    data: string;
  }

  interface Tables {
    user: User;
    photo: Photo;
  }
}
