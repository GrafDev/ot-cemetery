import React, { useState, useEffect } from 'react';
import { ICompany, ICompanyUpdateData } from '@/api/companyApi';
import checkIcon from '@/assets/images/Check.png';
import cancelIcon from '@/assets/images/X.png';
import inputsIcon from '@/assets/images/Inputs_icon.png';

interface EditCompanyDetailsProps {
    company: ICompany;
    onSave: (data: ICompanyUpdateData) => Promise<void>;
    onCancel: () => void;
}

const businessEntityOptions = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Liability Company',
];

const companyTypeOptions = [
    {id: 'funeral_home', label: 'Funeral Home'},
    {id: 'logistics_services', label: 'Logistics services'},
    {id: 'burial_care_contractor', label: 'Burial care Contractor'},
];

const EditCompanyDetails: React.FC<EditCompanyDetailsProps> = ({ company, onSave, onCancel }) => {
    const [contractNo, setContractNo] = useState<string>(company.contract.no);
    const [contractDate, setContractDate] = useState<string>(formatDateForInput(company.contract.issue_date));
    const [businessEntity, setBusinessEntity] = useState<string>(company.businessEntity);
    const [companyTypes, setCompanyTypes] = useState<string[]>(company.type);

    useEffect(() => {
        setContractNo(company.contract.no);
        setContractDate(formatDateForInput(company.contract.issue_date));
        setBusinessEntity(company.businessEntity);
        setCompanyTypes([...company.type]);
    }, [company]);

    const [isBusinessEntityOpen, setIsBusinessEntityOpen] = useState<boolean>(false);
    const [isCompanyTypeOpen, setIsCompanyTypeOpen] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const businessEntityElement = document.getElementById('business-entity-dropdown');
            const companyTypeElement = document.getElementById('company-type-dropdown');

            if (businessEntityElement && !businessEntityElement.contains(event.target as Node)) {
                setIsBusinessEntityOpen(false);
            }

            if (companyTypeElement && !companyTypeElement.contains(event.target as Node)) {
                setIsCompanyTypeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function formatDateForInput(dateString: string) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const updateData: ICompanyUpdateData = {
                businessEntity,
                type: companyTypes,
                contract: {
                    no: contractNo,
                    issue_date: new Date(contractDate).toISOString()
                }
            };

            await onSave(updateData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBusinessEntitySelect = (value: string) => {
        setBusinessEntity(value);
        setIsBusinessEntityOpen(false);
    };

    const handleCompanyTypeToggle = (typeId: string) => {
        if (companyTypes.includes(typeId)) {
            setCompanyTypes(prev => prev.filter(id => id !== typeId));
        } else {
            setCompanyTypes(prev => [...prev, typeId]);
        }
    };

    const getFormattedCompanyTypes = () => {
        const selectedTypes = companyTypeOptions
            .filter(option => companyTypes.includes(option.id))
            .map(option => option.label);
        return selectedTypes.join(', ');
    };

    return (
        <div className="company-details company-details--editing">
            <div className="company-details__header">
                <h2>Company Details</h2>
                <div className="company-details__actions">
                    <button
                        className="button button--outline button--small"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        <div className="button__icon">
                            <img src={checkIcon} alt="Save" />
                        </div>
                        <span className="button__label">
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </span>
                    </button>
                    <button
                        className="button button--outline button--small"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        <div className="button__icon">
                            <img src={cancelIcon} alt="Cancel" />
                        </div>
                        <span className="button__label">Cancel</span>
                    </button>
                </div>
            </div>

            <div className="company-details__form company-details__grid">
                <div className="company-details__label">Agreement:</div>
                <div className="company-details__form-row">
                    <input
                        type="text"
                        className="input"
                        value={contractNo}
                        onChange={(e) => setContractNo(e.target.value)}
                    />
                    <div className="company-details__label">Date:</div>
                    <input
                        type="date"
                        className="input"
                        value={contractDate}
                        onChange={(e) => setContractDate(e.target.value)}
                    />
                </div>

                <div className="company-details__label">Business entity:</div>
                <div>
                    <div
                        id="business-entity-dropdown"
                        className={`dropdown-select ${isBusinessEntityOpen ? 'open' : ''}`}
                    >
                        <div
                            className="dropdown-select__header"
                            onClick={() => setIsBusinessEntityOpen(!isBusinessEntityOpen)}
                            tabIndex={0}
                        >
                            <span>{businessEntity || 'Select business entity'}</span>
                            <img
                                src={inputsIcon}
                                alt="dropdown"
                                className="dropdown-select__arrow"
                            />
                        </div>
                        {isBusinessEntityOpen && (
                            <div className="dropdown-select__options">
                                {businessEntityOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`dropdown-select__option ${option === businessEntity ? 'dropdown-select__option--selected' : ''}`}
                                        onClick={() => handleBusinessEntitySelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="company-details__label">Company type:</div>
                <div>
                    <div
                        id="company-type-dropdown"
                        className={`dropdown-select ${isCompanyTypeOpen ? 'open' : ''}`}
                    >
                        <div
                            className="dropdown-select__header"
                            onClick={() => setIsCompanyTypeOpen(!isCompanyTypeOpen)}
                            tabIndex={0}
                        >
                            <span>{getFormattedCompanyTypes() || 'Select company types'}</span>
                            <img
                                src={inputsIcon}
                                alt="dropdown"
                                className="dropdown-select__arrow"
                            />
                        </div>

                        {isCompanyTypeOpen && (
                            <div className="dropdown-select__options dropdown-select__options--checkbox">
                                {companyTypeOptions.map(option => (
                                    <div
                                        key={option.id}
                                        className={`dropdown-select__checkbox-option ${companyTypes.includes(option.id) ? 'dropdown-select__checkbox-option--selected' : ''}`}
                                        onClick={() => handleCompanyTypeToggle(option.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`type-${option.id}`}
                                            checked={companyTypes.includes(option.id)}
                                            onChange={() => {}}
                                            className="dropdown-select__checkbox"
                                        />
                                        <label htmlFor={`type-${option.id}`}>{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCompanyDetails;
