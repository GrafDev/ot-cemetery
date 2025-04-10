import React, { useState, useEffect } from 'react';
import { IContact, IContactUpdateData } from '@/api/contactApi';
import checkIcon from '@/assets/images/Check.png';
import cancelIcon from '@/assets/images/X.png';

interface EditContactInfoProps {
    contact: IContact;
    onSave: (data: IContactUpdateData) => Promise<void>;
    onCancel: () => void;
}

const EditContactInfo: React.FC<EditContactInfoProps> = ({ contact, onSave, onCancel }) => {
    const [firstname, setFirstname] = useState<string>(contact.firstname);
    const [lastname, setLastname] = useState<string>(contact.lastname);
    const [phone, setPhone] = useState<string>(contact.phone);
    const [email, setEmail] = useState<string>(contact.email);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setFirstname(contact.firstname);
        setLastname(contact.lastname);
        setPhone(contact.phone);
        setEmail(contact.email);
    }, [contact]);

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const updateData: IContactUpdateData = {
                firstname,
                lastname,
                phone,
                email
            };

            await onSave(updateData);
        } finally {
            setIsLoading(false);
        }
    };

    const formatPhone = (input: string) => {
        // Удаляем все нецифровые символы
        const digits = input.replace(/\D/g, '');
        return digits;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    return (
        <div className="contact-info contact-info--editing">
            <div className="contact-info__header">
                <h2>Contacts</h2>
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

            <div className="contact-info__form contact-info__grid">
                <div className="contact-info__label">Responsible person:</div>
                <div className="contact-info__form-row">
                    <input
                        type="text"
                        className="input"
                        placeholder="First name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="Last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="contact-info__label">Phone number:</div>
                <div>
                    <input
                        type="tel"
                        className="input"
                        placeholder="Phone number"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>

                <div className="contact-info__label">E-mail:</div>
                <div>
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditContactInfo;
