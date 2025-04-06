import apiClient from './config';

export const authApi = {
    /**
     * Получение токена авторизации
     * @param username - имя пользователя
     * @returns Promise с токеном авторизации
     */
    auth: async (username: string): Promise<string> => {
        try {
            const response = await apiClient.get(`/auth?user=${username}`);
            // Получаем токен из заголовков ответа
            const authHeader = response.headers.authorization;
            if (!authHeader) {
                throw new Error('Токен авторизации не получен');
            }

            // Извлекаем токен из заголовка Authorization: Bearer _token_
            const token = authHeader.split(' ')[1];
            return token;
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            throw error;
        }
    }
};
