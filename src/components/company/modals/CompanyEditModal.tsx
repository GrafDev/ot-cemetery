import React, { useState } from 'react';
import { useCompanyStore } from '@/stores/storeContext.tsx';
import toast from 'react-hot-toast';
import { ICompany } from '@/api/companyApi';

interface CompanyEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: ICompany;
}

const CompanyEditModal: React.FC<CompanyEditModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               company
                                                           }) => {
    const companyStore = useCompanyStore();
    const [name, setName] = useState(company.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await companyStore.updateCompany(company.id, { name });
            toast.success('Company name updated successfully');
            onClose();
        } catch {
            toast.error(companyStore.error || 'Failed to update company name');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="modal__title">Edit Organization Name</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <div className="modal__actions">
                        <button
                            type="button"
                            className="button button--outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            <span className="button__label">Cancel</span>
                        </button>
                        <button
                            type="submit"
                            className="button button--filled"
                            disabled={isLoading}
                        >
                            <span className="button__label">
                                {isLoading ? 'Saving...' : 'Save'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyEditModal;
