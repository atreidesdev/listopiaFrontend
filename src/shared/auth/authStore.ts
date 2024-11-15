import { jwtDecode } from 'jwt-decode';
import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

type TokenPayload = {
  id: number;
  username: string;
  role: string;
  avatar?: string;
  profileName?: string;
};

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  userId: number | null = null;
  username: string | null = null;
  role: string | null = null;
  avatar: string | null = null;
  profileName: string | null = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'TokenStore',
      properties: [
        'accessToken',
        'refreshToken',
        'userId',
        'username',
        'role',
        'avatar',
        'profileName',
      ],
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }).then();
  }

  getToken(): string | null {
    return this.accessToken;
  }

  setTokens(accessToken: string, refreshToken: string) {
    runInAction(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      const decoded: TokenPayload = jwtDecode(accessToken);
      this.userId = decoded.id;
      this.username = decoded.username;
      this.role = decoded.role;
      this.avatar = decoded.avatar ?? null;
      this.profileName = decoded.profileName ?? null;
    });
  }

  clearTokens() {
    runInAction(() => {
      this.accessToken = null;
      this.refreshToken = null;
      this.userId = null;
      this.username = null;
      this.role = null;
      this.avatar = null;
      this.profileName = null;
    });
  }

  hasToken(): boolean {
    return this.accessToken !== null;
  }
}

export const authStore = new AuthStore();
export default authStore;
