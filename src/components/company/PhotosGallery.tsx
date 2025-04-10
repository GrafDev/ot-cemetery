import React, {useRef, useState} from 'react';
import {IoTrash} from 'react-icons/io5';
import {ICompany, ICompanyPhoto} from '@/api/companyApi.ts';
import EditButton from '@/components/ui/EditButton';
import {useCompanyStore} from '@/stores/storeContext';
import toast from 'react-hot-toast';

interface PhotosGalleryProps {
    company: ICompany;
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({company}) => {
    const companyStore = useCompanyStore();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddPhoto = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const success = await companyStore.uploadImage(company.id, file);

        if (success) {
            toast.success('Фото успешно загружено');
        }

        setIsUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    const handleDeletePhoto = async (imageName: string) => {
        try {
            await companyStore.deleteImage(company.id, imageName);
            toast.success('Фото успешно удалено');
        } catch {
            toast.error(companyStore.error || 'Ошибка при удалении фото');
        }
    };

    return (
        <div className="photos-gallery">
            <div className="photos-gallery__header">
                <h2>Photos</h2>
                <EditButton
                    onClick={handleAddPhoto}
                    text="Add"
                    iconType="addPhoto"
                    disabled={isUploading}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div className="photos-gallery__grid">
                {isUploading && (
                    <div className="photos-gallery__item photos-gallery__item--loading">
                        <div className="spinner"></div>
                        <p>Загрузка...</p>
                    </div>
                )}

                {company.photos
                    .filter((photo): photo is ICompanyPhoto => !!photo && !!photo.thumbpath)
                    .map((photo) => (
                        <div className="photos-gallery__item" key={photo.name}>
                            <img
                                src={photo.thumbpath}
                                alt={photo.name}
                                className="photos-gallery__thumb"
                            />
                            <button
                                className="photos-gallery__delete-btn"
                                aria-label="Delete photo"
                                onClick={() => handleDeletePhoto(photo.name)}
                            >
                                <IoTrash size={16}/>
                            </button>
                        </div>
                    ))}

                {company.photos.length === 0 && !isUploading && (
                    <div className="photos-gallery__empty">
                        <p>Нет загруженных фотографий</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotosGallery;
