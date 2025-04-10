import React from 'react';
import contractorIcon from '@/assets/images/Contractor.png';

const ContractorsPage: React.FC = () => {
    return (
        <div className="company-page">
            <div className="company-header">
                <div className="company-header__top">
                    <h1>Contractors</h1>
                </div>
            </div>

            <div className="company-page__content-stack">
                <div className="company-details">
                    <div className="company-details__header">
                        <h2>Contractors Management</h2>
                    </div>

                    <div className="feature-preview">
                        <img
                            src={contractorIcon}
                            alt="Contractors"
                            className="feature-preview__icon"
                        />
                        <h3 className="feature-preview__title">
                            Contractors Management Module
                        </h3>
                        <p className="feature-preview__description">
                            This section will allow you to manage all contractors working with your organization.
                            You will be able to add new contractors, edit their information, and manage
                            service agreements.
                        </p>
                        <div className="feature-preview__badge">
                            <strong>Coming Soon</strong> — This feature is currently in development
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractorsPage;
