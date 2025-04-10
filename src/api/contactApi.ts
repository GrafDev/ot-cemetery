import { API_URL } from '@/api/config';

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
    getContact: async (id: string): Promise<IContact> => {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при получении данных контакта: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    },

    updateContact: async (id: string, data: IContactUpdateData): Promise<IContact> => {
        const fullData = {
            firstname: data.firstname ?? '',
            lastname: data.lastname ?? '',
            phone: data.phone ?? '',
            email: data.email ?? '',
        };

        if (!fullData.firstname || !fullData.lastname || !fullData.phone || !fullData.email) {
            throw new Error('Все поля (firstname, lastname, phone, email) обязательны.');
        }

        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
            body: JSON.stringify(fullData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка при обновлении данных контакта: ${response.status} ${response.statusText}\n${errorText}`);
        }

        return await response.json();
    }
};
