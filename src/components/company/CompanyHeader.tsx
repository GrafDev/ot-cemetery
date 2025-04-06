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
            <div className="header-top">
                <h1>{company.name}</h1>
                <div className="actions">
                    <button className="icon-button" aria-label="Edit company">
                        <IoPencil size={20} />
                    </button>
                    <button className="icon-button delete" aria-label="Delete company" onClick={handleOpen}>
                        <IoTrash size={20} />
                    </button>
                </div>
            </div>

            <CompanyDeleteModal
                isOpen={isOpen}
                onClose={handleClose}
                companyId={company.id}
                companyName={company.name}
            />

            <style>{`
                .company-header {
                    padding: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .icon-button {
                    background: none;
                    border: none;
                    padding: 0.3rem;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background 0.2s;
                }

                .icon-button:hover {
                    background: #f1f1f1;
                }

                .icon-button.delete:hover {
                    background: #ffe5e5;
                }
            `}</style>
        </div>
    );
};

export default CompanyHeader;
