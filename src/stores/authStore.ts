import { makeAutoObservable, runInAction } from 'mobx';
import { authApi } from '../api/authApi';
import { setAuthToken } from '../api/config';
import { RootStore } from './rootStore';

export class AuthStore {
    rootStore: RootStore;
    token: string | null = null;
    isLoading: boolean = false;
    error: string | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });

        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            this.token = savedToken;
            setAuthToken(savedToken);
        }
    }

    async login(username: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const token = await authApi.auth(username);

            runInAction(() => {
                this.token = token;
                this.isLoading = false;
            });

            localStorage.setItem('auth_token', token);

            setAuthToken(token);
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при авторизации';
                this.isLoading = false;
            });
        }
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('auth_token');
        setAuthToken('');
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }
}
