import {API_URL} from "@/api/config.ts";
import toast from "react-hot-toast";

export interface ICompanyPhoto {
    name: string;
    filepath: string;
    thumbpath: string;
    createdAt: string;
}

export interface ICompanyContract {
    no: string;
    issue_date: string;
}

export interface ICompany {
    id: string;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string;
    contract: ICompanyContract;
    type: string[];
    status: string;
    photos: ICompanyPhoto[];
    createdAt: string;
    updatedAt: string;
}

export interface ICompanyUpdateData {
    name?: string;
    shortName?: string;
    businessEntity?: string;
    contract?: {
        no?: string;
        issue_date?: string;
    };
    type?: string[];
}

export const companyApi = {
    // Получение данных компании
    getCompany: async (id: string): Promise<ICompany> => {
        const response = await fetch(`https://test-task-api.allfuneral.com/companies/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка при получении данных компании: ${response.statusText}`);
        }

        return await response.json();
    },

    // Обновление данных компании
    updateCompany: async (id: string, data: ICompanyUpdateData): Promise<ICompany> => {
        const response = await fetch(`https://test-task-api.allfuneral.com/companies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Ошибка при обновлении данных компании: ${response.statusText}`);
        }

        return await response.json();
    },

    // Удаление компании
    deleteCompany: async (id: string): Promise<void> => {
        const response = await fetch(`https://test-task-api.allfuneral.com/companies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка при удалении компании: ${response.statusText}`);
        }
    },

    // Загрузка изображения
    uploadImage: async (id: string, file: File): Promise<ICompanyPhoto | null> => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}/companies/${id}/image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                if (response.status === 413) {
                    toast.error('Файл слишком большой. Максимум 5MB.');
                    return null;
                }
                toast.error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
            toast.error('Не удалось загрузить изображение. Попробуйте ещё раз.');
            return null;
        }
    },



    // Удаление изображения
    deleteImage: async (companyId: string, imageName: string): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/companies/${companyId}/image/${imageName}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                // Добавляем настройки CORS
                mode: 'cors',
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении изображения: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка удаления изображения:', error);
            // Переформатируем ошибку для лучшего отображения пользователю
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error('Неизвестная ошибка при удалении изображения');
            }
        }
    },

    // Получение списка компаний
    getCompanies: async (): Promise<ICompany[]> => {
        // Пока будем получать только одну компанию с id=12
        const response = await fetch(`https://test-task-api.allfuneral.com/companies/12`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка при получении списка компаний: ${response.statusText}`);
        }

        const company = await response.json();
        // Возвращаем массив из одной компании
        return [company];
    }
};

