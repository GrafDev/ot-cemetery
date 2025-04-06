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
                await companyStore.fetchCompany(id);
                if (companyStore.company?.contactId) {
                    await contactStore.fetchContact(companyStore.company.contactId);
                }
            };

            fetchData();
        }

        return () => {
            companyStore.reset();
            contactStore.reset();
        };
    }, [id, companyStore, contactStore]);

    if (companyStore.isLoading) {
        return (
            <div className="center-wrapper">
                <div className="spinner" />
                <style>{`
                    .spinner {
                        width: 48px;
                        height: 48px;
                        border: 4px solid #ccc;
                        border-top-color: #333;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
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
        <div className="company-page">
            <CompanyHeader company={companyStore.company} />

            <div className="content-stack">
                <CompanyDetails company={companyStore.company} />
                <ContactInfo contact={contactStore.contact} />
                <PhotosGallery company={companyStore.company} />
            </div>

            <style>{`
                .company-page {
                    background-color: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                }

                .content-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                }

                .center-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 80vh;
                    text-align: center;
                }

                .error-box {
                    padding: 1rem;
                    background-color: #fed7d7;
                    color: #9b2c2c;
                    border-radius: 6px;
                }
            `}</style>
        </div>
    );
};

export default observer(CompanyPage);
