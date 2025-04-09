import React from 'react';
import { IContact } from '@/api/contactApi';
import EditButton from '@/components/ui/EditButton';

interface ContactInfoProps {
    contact: IContact | null;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
    if (!contact) {
        return (
            <div className="contact-info">
                <div className="contact-info__header">
                    <h2>Contacts</h2>
                </div>
                <p className="text-muted">Контактная информация не найдена</p>
            </div>
        );
    }

    const formatPhone = (phone: string) => {
        if (!phone) return '';
        if (phone.startsWith('1')) {
            return `+1 ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
        }
        return phone;
    };

    const handleEdit = () => {
        // Здесь будет логика открытия модального окна для редактирования
        console.log('Edit contact info');
    };

    return (
        <div className="contact-info">
            <div className="contact-info__header">
                <h2>Contacts</h2>
                <EditButton onClick={handleEdit} />
            </div>

            <div className="contact-info__grid">
                <div className="contact-info__label">Responsible person:</div>
                <div>{contact.firstname} {contact.lastname}</div>

                <div className="contact-info__label">Phone number:</div>
                <div>{formatPhone(contact.phone)}</div>

                <div className="contact-info__label">E-mail:</div>
                <div>{contact.email}</div>
            </div>
        </div>
    );
};

export default ContactInfo;
