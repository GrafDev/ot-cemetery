import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {IContact, IContactUpdateData} from '@/api/contactApi';
import EditButton from '@/components/ui/EditButton';
import { useContactStore } from '@/stores/storeContext';
import toast from 'react-hot-toast';
import EditContactInfo from './EditContactInfo';

interface ContactInfoProps {
    contact: IContact | null;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
    const contactStore = useContactStore();
    const [isEditing, setIsEditing] = useState<boolean>(false);

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
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async (updateData: IContactUpdateData) => {
        try {
            await contactStore.updateContact(contact.id, updateData);
            setIsEditing(false);
            toast.success('Contact information updated successfully');
        } catch {
            toast.error(contactStore.error || 'Failed to update contact information');
            throw new Error('Failed to update contact information');
        }
    };

    // Рендер в режиме просмотра
    if (!isEditing) {
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
    }

    // Рендер в режиме редактирования через новый компонент
    return (
        <EditContactInfo
            contact={contact}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

export default observer(ContactInfo);
