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
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
};
export type Team = Entity<{
  id: string;
  name: string;
  budget: number;
}>;
