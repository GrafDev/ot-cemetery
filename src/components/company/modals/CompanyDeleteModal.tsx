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

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="modal__close" onClick={onClose}>&times;</button>
                <h2>Удаление компании</h2>
                <p>Вы уверены, что хотите удалить компанию "{companyName}"? Это действие нельзя будет отменить.</p>
                <div className="modal__actions">
                    <button className="btn btn--outline" onClick={onClose}>Отмена</button>
                    <button className="btn btn--danger" onClick={handleDelete}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDeleteModal;
