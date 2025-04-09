import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanyStore } from '@/stores/storeContext.tsx';
import toast from 'react-hot-toast';

interface CompanyDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyId: string;
    companyName: string;
}

const CompanyDeleteModal: React.FC<CompanyDeleteModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   companyId,
                                                                   companyName
                                                               }) => {
    const companyStore = useCompanyStore();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await companyStore.deleteCompany(companyId);
            toast.success(`Компания "${companyName}" удалена`);
            onClose();
            navigate('/');
        } catch {
            toast.error(companyStore.error || 'Ошибка при удалении компании');
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Если клик был прямо на backdrop (а не на его дочерних элементах), закрываем модалку
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal">
                <h2 className="modal__title">Remove the Organization?</h2>
                <p className="modal__text">Are you sure you want to remove this Organization?</p>
                <div className="modal__actions">
                    <button className="button button--outline" onClick={onClose}>
                        <span className="button__label">No</span>
                    </button>
                    <button className="button button--filled" onClick={handleDelete}>
                        <span className="button__label">Yes, remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDeleteModal;
