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
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>Удаление компании</h2>
                <p>Вы уверены, что хотите удалить компанию "{companyName}"? Это действие нельзя будет отменить.</p>
                <div className="modal-actions">
                    <button className="btn btn-outline" onClick={onClose}>Отмена</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
                </div>
            </div>
            <style>{`
                .modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .modal-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .btn {
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    border: none;
                }
                .btn-outline {
                    background: white;
                    border: 1px solid #ccc;
                }
                .btn-danger {
                    background: #e53e3e;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default CompanyDeleteModal;
