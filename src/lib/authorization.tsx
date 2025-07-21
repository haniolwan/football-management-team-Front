import { Comment, User } from '@/types/api';

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'USER' && comment.author?.id === user.id) {
      return true;
    }

    return false;
  },
};
