export enum Role {
  user = "user",
  ystem = "system",
}

export interface AuthUser {
  _id: string;
  username: string;
  profile: {
    role: Role;
    name?: string;
  };
}
