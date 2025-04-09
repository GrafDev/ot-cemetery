import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { ICompany } from '@/api/companyApi.ts';
import EditButton from '@/components/ui/EditButton';

interface PhotosGalleryProps {
    company: ICompany;
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({ company }) => {
    const handleAddPhoto = () => {
        // Здесь будет логика добавления новой фотографии
        console.log('Add new photo');
    };

    const handleDeletePhoto = (imageName: string) => {
        // Здесь будет логика удаления фотографии
        console.log('Delete photo:', imageName);
    };

    return (
        <div className="photos-gallery">
            <div className="photos-gallery__header">
                <h2>Photos</h2>
                <EditButton
                    onClick={handleAddPhoto}
                    text="Add"
                    iconType="addPhoto"
                />
            </div>

            <div className="photos-gallery__grid">
                {company.photos.map((photo) => (
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
                            <IoTrash size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosGallery;
