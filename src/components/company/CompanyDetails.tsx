import React, {useState} from 'react';
import {ICompany, ICompanyUpdateData} from '@/api/companyApi';
import EditButton from '@/components/ui/EditButton';
import {useCompanyStore} from '@/stores/storeContext';
import toast from 'react-hot-toast';
import {formatCompanyTypes} from '@/utils/companyUtils';

interface CompanyDetailsProps {
    company: ICompany;
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

const CompanyDetails: React.FC<CompanyDetailsProps> = ({company}) => {
    const companyStore = useCompanyStore();

    // Состояние для режима редактирования
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Состояния для полей формы
    const [contractNo, setContractNo] = useState<string>(company.contract.no);
    const [contractDate, setContractDate] = useState<string>(formatDateForInput(company.contract.issue_date));
    const [businessEntity, setBusinessEntity] = useState<string>(company.businessEntity);
    const [companyTypes, setCompanyTypes] = useState<string[]>(company.type);

    // Состояния для выпадающих списков
    const [isBusinessEntityOpen, setIsBusinessEntityOpen] = useState<boolean>(false);
    const [isCompanyTypeOpen, setIsCompanyTypeOpen] = useState<boolean>(false);

    // Состояние загрузки
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Вместо использования хука useClickOutside, добавим обработчики клика документа
    React.useEffect(() => {
        // Функция для закрытия выпадающих списков при клике вне их
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

        // Добавляем слушатель событий при монтировании компонента
        document.addEventListener('mousedown', handleClickOutside);

        // Удаляем слушатель при размонтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Форматирование даты для отображения
    function formatDateForDisplay(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }

    // Форматирование даты для input type="date"
    function formatDateForInput(dateString: string) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Сбрасываем значения полей к исходным
        setContractNo(company.contract.no);
        setContractDate(formatDateForInput(company.contract.issue_date));
        setBusinessEntity(company.businessEntity);
        setCompanyTypes(company.type);

        // Закрываем выпадающие списки
        setIsBusinessEntityOpen(false);
        setIsCompanyTypeOpen(false);

        // Выключаем режим редактирования
        setIsEditing(false);
    };

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

            await companyStore.updateCompany(company.id, updateData);

            // Выключаем режим редактирования после успешного сохранения
            setIsEditing(false);
            toast.success('Company details updated successfully');
        } catch {
            toast.error(companyStore.error || 'Failed to update company details');
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

    // Получаем отформатированную строку с типами компании для отображения
    const getFormattedCompanyTypes = () => {
        const selectedTypes = companyTypeOptions
            .filter(option => companyTypes.includes(option.id))
            .map(option => option.label);
        return selectedTypes.join(', ');
    };

    // Рендер в режиме просмотра
    if (!isEditing) {
        return (
            <div className="company-details">
                <div className="company-details__header">
                    <h2>Company Details</h2>
                    <EditButton onClick={handleEdit}/>
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

    // Рендер в режиме редактирования
    return (
        <div className="company-details company-details--editing">
            <div className="company-details__header">
                <h2>Company Details</h2>
                <div className="company-details__actions">

                    <button
                        className="button button--save"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        <span className="button__label">
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </span>
                    </button>
                    <button
                        className="button button--outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
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
                    <div id="business-entity-dropdown" className="dropdown-select">
                        <div
                            className="dropdown-select__header"
                            onClick={() => setIsBusinessEntityOpen(!isBusinessEntityOpen)}
                        >
                            <span>{businessEntity}</span>
                            <span className="dropdown-select__arrow"></span>
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
                    <div id="company-type-dropdown" className="dropdown-select">
                        <div
                            className="dropdown-select__header"
                            onClick={() => setIsCompanyTypeOpen(!isCompanyTypeOpen)}
                        >
                            <span>{getFormattedCompanyTypes() || 'Select company types'}</span>
                            <span className="dropdown-select__arrow"></span>
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
                                            onChange={() => {
                                            }}
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

export default CompanyDetails;
