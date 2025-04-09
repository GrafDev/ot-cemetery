import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useCompanyStore } from '../stores/storeContext';
import companyIcon from '@/assets/images/Company.png';
import chevronIcon from '@/assets/images/Chevron.png';
import {formatCompanyTypes} from "@/utils/companyUtils.ts"; // Предполагаем, что у вас есть такая иконка

const CompaniesList: React.FC = () => {
    const companyStore = useCompanyStore();
    const navigate = useNavigate();


    useEffect(() => {
        // Загружаем список компаний при монтировании компонента
        const fetchData = async () => {
            await companyStore.fetchCompanies();
        };

        fetchData();

        // Очищаем состояние при размонтировании
        return () => {
            companyStore.resetList();
        };
    }, [companyStore]);

    // Обработчик для перехода к детальной странице компании
    const handleCompanyClick = (id: string) => {
        navigate(`/company/${id}`);
    };

    if (companyStore.isLoadingList) {
        return (
            <div className="center-wrapper">
                <div className="spinner" />
            </div>
        );
    }

    if (companyStore.listError) {
        return (
            <div className="center-wrapper">
                <div className="error-box">
                    Ошибка: {companyStore.listError}
                </div>
            </div>
        );
    }

    return (
        <div className="company-page">
            <div className="company-header">
                <div className="company-header__top">
                    <h1>Organizations</h1>
                </div>
            </div>

            <div className="company-page__content-stack">
                {companyStore.companies.length === 0 ? (
                    <div className="company-list__empty">
                        Список компаний пуст
                    </div>
                ) : (
                    <div className="company-list">
                        {companyStore.companies.map((company) => (
                            <div
                                key={company.id}
                                className="company-list__item"
                                onClick={() => handleCompanyClick(company.id)}
                            >
                                <div className="company-list__item-left-icon">
                                    <img src={companyIcon} alt="Company" />
                                </div>
                                <div className="company-list__item-info">
                                    <h3 className="company-list__item-title">{company.name}</h3>
                                    <p className="company-list__item-subtitle">{formatCompanyTypes(company.type)}</p>
                                </div>
                                <div className="company-list__item-chevron">
                                    <img src={chevronIcon} alt="Подробнее" className="company-list__chevron-icon" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(CompaniesList);
