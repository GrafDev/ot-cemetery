import { makeAutoObservable, runInAction } from 'mobx';
import { contactApi, IContact, IContactUpdateData } from '../api/contactApi';
import { RootStore } from './rootStore';

export class ContactStore {
    rootStore: RootStore;
    contact: IContact | null = null;
    isLoading: boolean = false;
    error: string | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });
    }

    // Получение данных контакта
    async fetchContact(id: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const contactData = await contactApi.getContact(id);

            runInAction(() => {
                this.contact = contactData;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при загрузке данных контакта';
                this.isLoading = false;
            });
        }
    }

    // Обновление данных контакта
    async updateContact(id: string, data: IContactUpdateData): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedContact = await contactApi.updateContact(id, data);

            runInAction(() => {
                this.contact = updatedContact;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении данных контакта';
                this.isLoading = false;
            });
        }
    }

    // Сброс состояния
    reset(): void {
        this.contact = null;
        this.isLoading = false;
        this.error = null;
    }
}
