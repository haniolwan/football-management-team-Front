export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type User = Entity<{
  name: string;
  email: string;
  role: 'USER';
  teamId?: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Team = Entity<{
  name: string;
}>;
