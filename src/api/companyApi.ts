import apiClient from './config';
import { AxiosResponse } from 'axios';

// Интерфейсы для типизации
export interface IContract {
    no: string;
    issue_date: string;
}

export interface IPhoto {
    name: string;
    filepath: string;
    thumbpath: string;
    createdAt: string;
}

export interface ICompany {
    id: string;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string;
    contract: IContract;
    type: string[];
    status: string;
    photos: IPhoto[];
    createdAt: string;
    updatedAt: string;
}

export interface ICompanyUpdateData {
    name?: string;
    shortName?: string;
    businessEntity?: string;
    contract?: IContract;
    type?: string[];
}

export const companyApi = {
    // Получение информации о компании
    getCompany: async (id: string): Promise<ICompany> => {
        try {
            const response: AxiosResponse<ICompany> = await apiClient.get(`/companies/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных компании:', error);
            throw error;
        }
    },

    // Обновление данных компании
    updateCompany: async (id: string, data: ICompanyUpdateData): Promise<ICompany> => {
        try {
            const response: AxiosResponse<ICompany> = await apiClient.patch(`/companies/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении данных компании:', error);
            throw error;
        }
    },

    // Удаление компании
    deleteCompany: async (id: string): Promise<void> => {
        try {
            await apiClient.delete(`/companies/${id}`);
        } catch (error) {
            console.error('Ошибка при удалении компании:', error);
            throw error;
        }
    },

    // Загрузка изображения
    uploadImage: async (id: string, file: File): Promise<IPhoto> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response: AxiosResponse<IPhoto> = await apiClient.post(
                `/companies/${id}/image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            throw error;
        }
    },

    // Удаление изображения
    deleteImage: async (companyId: string, imageName: string): Promise<void> => {
        try {
            await apiClient.delete(`/companies/${companyId}/image/${imageName}`);
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
            throw error;
        }
    }
};
