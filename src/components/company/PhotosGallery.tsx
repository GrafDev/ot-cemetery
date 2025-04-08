import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { ICompany } from '@/api/companyApi.ts';

interface PhotosGalleryProps {
    company: ICompany;
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({ company }) => {
    return (
        <div className="photos-gallery">
            <div className="photos-gallery__header">
                <h2>Photos</h2>
                <button className="edit-button">Add</button>
            </div>

            <div className="photos-gallery__grid">
                {company.photos.map((photo) => (
                    <div className="photos-gallery__item" key={photo.name}>
                        <img
                            src={photo.thumbpath}
                            alt={photo.name}
                            className="photos-gallery__thumb"
                        />
                        <button className="photos-gallery__delete-btn" aria-label="Delete photo">
                            <IoTrash size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosGallery;
