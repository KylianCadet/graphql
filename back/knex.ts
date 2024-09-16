declare module 'knex/types/tables' {
  export interface User {
    id: number;
    name: string;
  }

  export interface Photo {
    id: number;
    user_id: number;
    data: string;
  }

  interface Tables {
    user: User;
    photo: Photo;
  }
}
