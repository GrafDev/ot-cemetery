import React from 'react';
import { ICompany } from '@/api/companyApi.ts';

interface CompanyDetailsProps {
    company: ICompany;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
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
            <div className="header">
                <h2>Company Details</h2>
                <button className="btn btn-outline">Edit</button>
            </div>

            <div className="details-grid">
                <div className="label">Agreement:</div>
                <div>{company.contract.no} / {formatDate(company.contract.issue_date)}</div>

                <div className="label">Business entity:</div>
                <div>{company.businessEntity}</div>

                <div className="label">Company type:</div>
                <div>{formatCompanyTypes(company.type)}</div>
            </div>

            <style>{`
                .company-details {
                    padding: 1rem;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 0.5rem 1rem;
                }

                .label {
                    color: #6b7280; /* gray-500 */
                    font-weight: 500;
                }

                .btn {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.9rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .btn:hover {
                    background: #f5f5f5;
                }

                .btn-outline {
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default CompanyDetails;
