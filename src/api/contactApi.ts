import apiClient from './config';
import { AxiosResponse } from 'axios';

// Интерфейсы для типизации
export interface IContact {
    id: string;
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IContactUpdateData {
    lastname?: string;
    firstname?: string;
    phone?: string;
    email?: string;
}

export const contactApi = {
    // Получение информации о контакте
    getContact: async (id: string): Promise<IContact> => {
        try {
            const response: AxiosResponse<IContact> = await apiClient.get(`/contacts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных контакта:', error);
            throw error;
        }
    },

    // Обновление данных контакта
    updateContact: async (id: string, data: IContactUpdateData): Promise<IContact> => {
        try {
            const response: AxiosResponse<IContact> = await apiClient.patch(`/contacts/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении данных контакта:', error);
            throw error;
        }
    }
};
