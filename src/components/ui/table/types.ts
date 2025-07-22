export type PositionType =
  | 'Goalkeeper'
  | 'Defender'
  | 'Midfielder'
  | 'Attacker';

export type TokenType = 'ACCESS' | 'REFRESH';

export interface Token {
  id: number;
  token: string;
  type: TokenType;
  expires: Date;
  blacklisted: boolean;
  createdAt: Date;
  user: User;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  role: 'USER';
  createdAt: Date;
  updatedAt: Date;
  Token?: Token[];
  teamId?: number;
  Team: Team[];
}

export interface Team {
  id: number;
  name: string;
  budget: number;
  userId: number;
  user: User;
  Player: Player[];
  createdAt: Date;
  updatedAt: Date;
}

interface Player {
  id: string;
  name: string;
  position: PositionType;
  age: number;
  nationality: string;
  value: number;
  rating: number;
  isListed: boolean;
  askingPrice?: number;
  team?: Team;
  teamId?: number;
  createdAt: Date;
  updatedAt: Date;
}
