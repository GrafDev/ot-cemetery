import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICompany } from '@/api/companyApi.ts';
import CompanyDeleteModal from './modals/CompanyDeleteModal';
import CompanyEditModal from './modals/CompanyEditModal';
import editIcon from '@/assets/images/iam2.png';
import trashIcon from '@/assets/images/Trash.png';
import chevronIcon from '@/assets/images/Chevron.png';

interface CompanyHeaderProps {
    company: ICompany;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="company-header-wrapper">
            <div className="back-button" onClick={handleBack}>
                <img src={chevronIcon} alt="Назад" className="back-button__icon" />
            </div>
            <div className="company-header">
                <div className="company-header__top">
                    <h1>{company.name}</h1>
                    <div className="company-header__actions">
                        <button
                            className="icon-button"
                            aria-label="Edit company"
                            onClick={handleOpenEditModal}
                        >
                            <img
                                src={editIcon}
                                alt="Edit"
                                className="icon-button__img"
                                width={22}
                                height={22}
                            />
                        </button>
                        <button
                            className="icon-button icon-button--delete"
                            aria-label="Delete company"
                            onClick={handleOpenDeleteModal}
                        >
                            <img
                                src={trashIcon}
                                alt="Delete"
                                className="icon-button__img"
                                width={22}
                                height={22}
                            />
                        </button>
                    </div>
                </div>

                <CompanyDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    companyId={company.id}
                    companyName={company.name}
                />

                <CompanyEditModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    company={company}
                />
            </div>
        </div>
    );
};

export default CompanyHeader;
