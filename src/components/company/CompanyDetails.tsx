import React from 'react';
import { ICompany } from '@/api/companyApi.ts';

interface CompanyDetailsProps {
    company: ICompany;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU').replace(/\./g, '.'); // использовать формат dd.mm.yyyy
    };

    const formatCompanyTypes = (types: string[]) => {
        if (!types || types.length === 0) return '';

        const typeLabels: Record<string, string> = {
            funeral_home: 'Funeral Home',
            logistics_services: 'Logistics services',
            burial_care_contractor: 'Burial care contractor'
        };

        return types.map(type => typeLabels[type] || type).join(', ');
    };

    return (
        <div className="company-details">
            <div className="company-details__header">
                <h2>Company Details</h2>
                <button className="edit-button">Edit</button>
            </div>

            <div className="company-details__grid">
                <div className="company-details__label">Agreement:</div>
                <div>{company.contract.no} / {formatDate(company.contract.issue_date)}</div>

                <div className="company-details__label">Business entity:</div>
                <div>{company.businessEntity}</div>

                <div className="company-details__label">Company type:</div>
                <div>{formatCompanyTypes(company.type)}</div>
            </div>
        </div>
    );
};

export default CompanyDetails;
