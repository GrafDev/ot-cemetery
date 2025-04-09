// src/components/ui/EditButton.tsx
import React from 'react';
import editIcon from '@/assets/images/iam2.png';
import addPhotoIcon from '@/assets/images/Add Photo.png';

interface EditButtonProps {
    onClick: () => void;
    text?: string;
    iconType?: 'edit' | 'addPhoto';
    disabled?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({
                                                   onClick,
                                                   text = 'Edit',
                                                   iconType = 'edit',
                                                   disabled = false
                                               }) => {
    // Выбираем иконку в зависимости от параметра iconType
    const icon = iconType === 'addPhoto' ? addPhotoIcon : editIcon;

    return (
        <button
            className="button button--outline button--small"
            onClick={onClick}
            disabled={disabled}
        >
            <div className="button__icon">
                <img src={icon} alt={text} />
            </div>
            <span className="button__label">{text}</span>
        </button>
    );
};

export default EditButton;
