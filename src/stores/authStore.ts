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

        // Пытаемся восстановить токен из localStorage, если он там есть
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            this.token = savedToken;
            setAuthToken(savedToken);
        }
    }

    // Метод для авторизации
    async login(username: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const token = await authApi.auth(username);

            runInAction(() => {
                this.token = token;
                this.isLoading = false;
            });

            // Сохраняем токен в localStorage
            localStorage.setItem('auth_token', token);

            // Устанавливаем токен для запросов
            setAuthToken(token);
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при авторизации';
                this.isLoading = false;
            });
        }
    }

    // Метод для выхода из аккаунта
    logout(): void {
        this.token = null;
        // Удаляем токен из localStorage
        localStorage.removeItem('auth_token');
        // Очищаем токен в API
        setAuthToken('');
    }

    // Геттер для проверки, авторизован ли пользователь
    get isAuthenticated(): boolean {
        return !!this.token;
    }
}
