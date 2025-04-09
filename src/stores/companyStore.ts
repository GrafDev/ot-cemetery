// src/stores/companyStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { companyApi, ICompany, ICompanyUpdateData} from '../api/companyApi';
import { RootStore } from './rootStore';

export class CompanyStore {
    rootStore: RootStore;
    company: ICompany | null = null;
    isLoading: boolean = false;
    error: string | null = null;

    // Добавленные свойства для работы со списком компаний
    companies: ICompany[] = [];
    isLoadingList: boolean = false;
    listError: string | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });
    }

    // Получение данных компании
    async fetchCompany(id: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const companyData = await companyApi.getCompany(id);

            runInAction(() => {
                this.company = companyData;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при загрузке данных компании';
                this.isLoading = false;
            });
        }
    }

    // Обновление данных компании
    async updateCompany(id: string, data: ICompanyUpdateData): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedCompany = await companyApi.updateCompany(id, data);

            runInAction(() => {
                this.company = updatedCompany;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении данных компании';
                this.isLoading = false;
            });
        }
    }

    // Удаление компании
    async deleteCompany(id: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            await companyApi.deleteCompany(id);

            runInAction(() => {
                this.company = null;
                this.isLoading = false;

                // Если компания есть в списке, удаляем её оттуда
                if (this.companies.length > 0) {
                    this.companies = this.companies.filter(company => company.id !== id);
                }
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при удалении компании';
                this.isLoading = false;
            });
        }
    }

    // Загрузка изображения
    async uploadImage(id: string, file: File): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const photo = await companyApi.uploadImage(id, file);

            runInAction(() => {
                if (this.company) {
                    this.company.photos = [...this.company.photos, photo];
                }
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при загрузке изображения';
                this.isLoading = false;
            });
        }
    }

    // Удаление изображения
    async deleteImage(companyId: string, imageName: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            await companyApi.deleteImage(companyId, imageName);

            runInAction(() => {
                if (this.company) {
                    this.company.photos = this.company.photos.filter(photo => photo.name !== imageName);
                }
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при удалении изображения';
                this.isLoading = false;
            });
        }
    }

    // Получение списка компаний
    async fetchCompanies(): Promise<void> {
        this.isLoadingList = true;
        this.listError = null;

        try {
            const companiesData = await companyApi.getCompanies();

            runInAction(() => {
                this.companies = companiesData;
                this.isLoadingList = false;
            });
        } catch (error) {
            runInAction(() => {
                this.listError = error instanceof Error ? error.message : 'Произошла ошибка при загрузке списка компаний';
                this.isLoadingList = false;
            });
        }
    }

    // Сброс состояния списка компаний
    resetList(): void {
        this.companies = [];
        this.isLoadingList = false;
        this.listError = null;
    }

    // Сброс состояния
    reset(): void {
        this.company = null;
        this.isLoading = false;
        this.error = null;
    }
}
