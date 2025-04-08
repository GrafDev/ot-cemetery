import React, { useState } from 'react';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { ICompany } from '@/api/companyApi.ts';
import CompanyDeleteModal from './modals/CompanyDeleteModal';

interface CompanyHeaderProps {
    company: ICompany;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="company-header">
            <div className="company-header__top">
                <h1>{company.name}</h1>
                <div className="company-header__actions">
                    <button
                        className="icon-button"
                        aria-label="Edit company"
                    >
                        <IoPencil size={22} />
                    </button>
                    <button
                        className="icon-button"
                        aria-label="Delete company"
                        onClick={handleOpen}
                    >
                        <IoTrash size={22} color="#e53e3e" />
                    </button>
                </div>
            </div>

            <CompanyDeleteModal
                isOpen={isOpen}
                onClose={handleClose}
                companyId={company.id}
                companyName={company.name}
            />
        </div>
    );
};

export default CompanyHeader;
