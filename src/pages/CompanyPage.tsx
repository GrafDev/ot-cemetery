import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useCompanyStore, useContactStore } from '../stores/storeContext';
import CompanyHeader from '../components/company/CompanyHeader';
import CompanyDetails from '../components/company/CompanyDetails';
import ContactInfo from '../components/company/ContactInfo';
import PhotosGallery from '../components/company/PhotosGallery';

const CompanyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const companyStore = useCompanyStore();
    const contactStore = useContactStore();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                if (!companyStore.company || companyStore.company.id !== id) {
                    await companyStore.fetchCompany(id);
                }

                if (companyStore.company?.contactId) {
                    if (!contactStore.contact || contactStore.contact.id !== companyStore.company.contactId) {
                        await contactStore.fetchContact(companyStore.company.contactId);
                    }
                }
            };

            fetchData();
        }


    }, [id, companyStore, contactStore]);

    if (companyStore.isLoading) {
        return (
            <div className="center-wrapper">
                <div className="spinner" />
            </div>
        );
    }

    if (companyStore.error) {
        return (
            <div className="center-wrapper">
                <div className="error-box">
                    Ошибка: {companyStore.error}
                </div>
            </div>
        );
    }

    if (!companyStore.company) {
        return (
            <div className="center-wrapper">
                <p>Данные о компании не найдены</p>
            </div>
        );
    }

    return (
        <div className="company-page-container">
            <CompanyHeader company={companyStore.company} />
            <div className="company-page">
                <div className="company-page__content-stack">
                    <CompanyDetails company={companyStore.company} />
                    <ContactInfo contact={contactStore.contact} />
                    <PhotosGallery company={companyStore.company} />
                </div>
            </div>
        </div>
    );
};

export default observer(CompanyPage);
