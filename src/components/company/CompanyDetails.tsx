import React, { useState } from 'react';
import { ICompany, ICompanyUpdateData } from '@/api/companyApi';
import EditButton from '@/components/ui/EditButton';
import { useCompanyStore } from '@/stores/storeContext';
import toast from 'react-hot-toast';
import { formatCompanyTypes } from '@/utils/companyUtils';
import EditCompanyDetails from './EditCompanyDetails';

interface CompanyDetailsProps {
    company: ICompany;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
    const companyStore = useCompanyStore();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    function formatDateForDisplay(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async (updateData: ICompanyUpdateData) => {
        try {
            await companyStore.updateCompany(company.id, updateData);
            setIsEditing(false);
            toast.success('Company details updated successfully');
        } catch {
            toast.error(companyStore.error || 'Failed to update company details');
            throw new Error('Failed to update company details');
        }
    };

    if (!isEditing) {
        return (
            <div className="company-details">
                <div className="company-details__header">
                    <h2>Company Details</h2>
                    <EditButton onClick={handleEdit} />
                </div>

                <div className="company-details__grid">
                    <div className="company-details__label">Agreement:</div>
                    <div>{company.contract.no} / {formatDateForDisplay(company.contract.issue_date)}</div>

                    <div className="company-details__label">Business entity:</div>
                    <div>{company.businessEntity}</div>

                    <div className="company-details__label">Company type:</div>
                    <div>{formatCompanyTypes(company.type)}</div>
                </div>
            </div>
        );
    }

    return (
        <EditCompanyDetails
            company={company}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

export default CompanyDetails;
