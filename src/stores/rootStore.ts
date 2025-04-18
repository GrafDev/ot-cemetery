import { AuthStore } from './authStore';
import { CompanyStore } from './companyStore';
import { ContactStore } from './contactStore';

export class RootStore {
    authStore: AuthStore;
    companyStore: CompanyStore;
    contactStore: ContactStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.companyStore = new CompanyStore(this);
        this.contactStore = new ContactStore(this);
    }
}

export const rootStore = new RootStore();
