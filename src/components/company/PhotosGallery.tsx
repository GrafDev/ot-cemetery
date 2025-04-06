import React from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import { ICompany } from '@/api/companyApi.ts';

interface PhotosGalleryProps {
    company: ICompany;
}

const PhotosGallery: React.FC<PhotosGalleryProps> = ({ company }) => {
    return (
        <div className="photos-gallery">
            <div className="gallery-header">
                <h2>Photos</h2>
                <button className="btn btn-outline">
                    <IoAdd style={{ marginRight: '0.3rem' }} /> Add
                </button>
            </div>

            <div className="photo-grid">
                {company.photos.map((photo) => (
                    <div className="photo-item" key={photo.name}>
                        <img
                            src={photo.thumbpath}
                            alt={photo.name}
                            className="photo-thumb"
                        />
                        <button className="delete-btn" aria-label="Delete photo">
                            <IoTrash />
                        </button>
                    </div>
                ))}
            </div>

            <style>{`
                .photos-gallery {
                    padding: 1rem 0;
                }

                .gallery-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .btn {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.4rem 0.8rem;
                    font-size: 0.9rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .btn-outline:hover {
                    background: #f5f5f5;
                }

                .photo-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                }

                .photo-item {
                    position: relative;
                    overflow: hidden;
                    border-radius: 8px;
                }

                .photo-thumb {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                .delete-btn {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background-color: rgba(0, 0, 0, 0.6);
                    color: white;
                    border: none;
                    padding: 0.3rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .delete-btn:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                }
            `}</style>
        </div>
    );
};

export default PhotosGallery;
