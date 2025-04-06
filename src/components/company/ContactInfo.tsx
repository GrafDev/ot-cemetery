import React from 'react';
import { IContact } from '../../api/contactApi';

interface ContactInfoProps {
    contact: IContact | null;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
    if (!contact) {
        return (
            <div className="contact-info">
                <h2>Contacts</h2>
                <p className="text-muted">Контактная информация не найдена</p>
                <style>{`
                    .text-muted {
                        color: #6b7280; /* gray-500 */
                    }
                `}</style>
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

    return (
        <div className="contact-info">
            <div className="header">
                <h2>Contacts</h2>
                <button className="btn btn-outline">Edit</button>
            </div>

            <div className="info-grid">
                <div className="label">Responsible person:</div>
                <div>{contact.firstname} {contact.lastname}</div>

                <div className="label">Phone number:</div>
                <div>{formatPhone(contact.phone)}</div>

                <div className="label">E-mail:</div>
                <div>{contact.email}</div>
            </div>

            <style>{`
                .contact-info {
                    padding: 1rem 0;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 0.5rem 1rem;
                }

                .label {
                    color: #6b7280;
                    font-weight: 500;
                }

                .btn {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.9rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .btn-outline {
                    color: #333;
                }

                .btn:hover {
                    background: #f5f5f5;
                }
            `}</style>
        </div>
    );
};

export default ContactInfo;
