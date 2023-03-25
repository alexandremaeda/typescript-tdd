export interface AddUser {
  add: (user: AddUser.Params) => Promise<void>;
}

namespace AddUser {
  export type Params = {
    id: number;
    email: string;
    name: string;
  };
}
