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

    async updateContact(id: string, data: IContactUpdateData): Promise<void> {
        if (!this.contact) {
            this.error = 'Нет данных контакта для обновления';
            return;
        }

        this.updateContactLocally(data);

        this.isLoading = true;
        this.error = null;

        try {
            await contactApi.updateContact(id, data);

            runInAction(() => {
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении данных контакта';
                this.isLoading = false;
                throw error;
            });
        }
    }

    updateContactLocally(data: IContactUpdateData): void {
        if (!this.contact) return;

        runInAction(() => {
            if (data.firstname !== undefined) {
                this.contact!.firstname = data.firstname;
            }

            if (data.lastname !== undefined) {
                this.contact!.lastname = data.lastname;
            }

            if (data.phone !== undefined) {
                this.contact!.phone = data.phone;
            }

            if (data.email !== undefined) {
                this.contact!.email = data.email;
            }
        });
    }

    reset(): void {
        this.contact = null;
        this.isLoading = false;
        this.error = null;
    }
}
