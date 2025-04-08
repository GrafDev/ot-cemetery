import React from 'react';
import accountIcon from '@/assets/images/Account.png';
// Предполагается, что у вас будет добавлен импорт стилей в main.css

const ClientsPage: React.FC = () => {
    return (
        <div className="company-page">
            <div className="company-header">
                <div className="company-header__top">
                    <h1>Clients</h1>
                </div>
            </div>

            <div className="company-page__content-stack">
                <div className="company-details">
                    <div className="company-details__header">
                        <h2>Client Database</h2>
                    </div>

                    <div className="feature-preview">
                        <img
                            src={accountIcon}
                            alt="Clients"
                            className="feature-preview__icon"
                        />
                        <h3 className="feature-preview__title">
                            Client Management System
                        </h3>
                        <p className="feature-preview__description">
                            The client management module will allow you to maintain a comprehensive database
                            of all clients. You will be able to store contact information, service history,
                            and manage client relationships effectively.
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

export default ClientsPage;
