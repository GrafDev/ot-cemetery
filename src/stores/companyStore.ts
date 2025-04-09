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
        if (!this.company) {
            this.error = 'Нет данных компании для обновления';
            return;
        }

        // Сначала обновляем данные локально
        this.updateCompanyLocally(data);

        // Если компания есть в списке, обновляем её и там
        if (this.companies.length > 0 && this.company) {
            this.updateCompanyInList(this.company);
        }

        this.isLoading = true;
        this.error = null;

        try {
            // Отправляем данные на сервер
            await companyApi.updateCompany(id, data);

            runInAction(() => {
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при обновлении данных компании';
                this.isLoading = false;
                throw error;
            });
        }
    }

    // Метод для локального обновления данных компании
    updateCompanyLocally(data: ICompanyUpdateData): void {
        if (!this.company) return;

        runInAction(() => {
            // Обновляем только те поля, которые пришли в data
            if (data.name !== undefined) {
                this.company!.name = data.name;
            }

            if (data.shortName !== undefined) {
                this.company!.shortName = data.shortName;
            }

            if (data.businessEntity !== undefined) {
                this.company!.businessEntity = data.businessEntity;
            }

            if (data.contract) {
                if (data.contract.no !== undefined) {
                    this.company!.contract.no = data.contract.no;
                }

                if (data.contract.issue_date !== undefined) {
                    this.company!.contract.issue_date = data.contract.issue_date;
                }
            }

            if (data.type !== undefined) {
                this.company!.type = [...data.type];
            }
        });
    }

    // Обновление компании в списке
    updateCompanyInList(updatedCompany: ICompany): void {
        const index = this.companies.findIndex(company => company.id === updatedCompany.id);

        if (index !== -1) {
            runInAction(() => {
                // Заменяем компанию в массиве
                this.companies[index] = updatedCompany;
                // В случае работы с иммутабельными данными, создаем новый массив
                // this.companies = [...this.companies.slice(0, index), updatedCompany, ...this.companies.slice(index + 1)];
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
    async uploadImage(id: string, file: File): Promise<boolean> {
        this.isLoading = true;
        this.error = null;

        try {
            const photo = await companyApi.uploadImage(id, file);

            if (!photo) {
                // Ошибка уже показана через toast в companyApi
                runInAction(() => {
                    this.isLoading = false;
                });
                return false;
            }

            runInAction(() => {
                if (this.company) {
                    this.company.photos = [...this.company.photos, photo];
                }
                this.isLoading = false;
            });

            return true;
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Произошла ошибка при загрузке изображения';
                this.isLoading = false;
            });
            return false;
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
