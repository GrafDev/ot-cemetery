import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../stores/storeContext';
import { useForm } from 'react-hook-form';

interface LoginFormData {
    username: string;
}

const LoginPage: React.FC = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await authStore.login(data.username);
            navigate('/company/12');
        } catch {
            console.error('Authentication error:', authStore.error || 'Failed to login');
        }
    };

    const handleCancel = () => {
        // Optional cancel logic
    };

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login-title">Specify the Organization's name</h2>

                <input
                    className="login-input"
                    placeholder="Eternal Rest Funeral Home"
                    {...register('username', { required: true })}
                />

                <div className="login-buttons">
                    <button type="button" className="btn btn-outline" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        data-loading={authStore.isLoading}
                    >
                        Save changes
                    </button>
                </div>
            </form>

            <style>{`
                .login-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                    padding: 1rem;
                }

                .login-form {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    max-width: 400px;
                    width: 100%;
                }

                .login-title {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: #4a5568;
                }

                .login-input {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    font-size: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-bottom: 1.5rem;
                }

                .login-buttons {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .btn {
                    flex: 1;
                    padding: 0.5rem 0.75rem;
                    font-size: 0.95rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .btn-outline {
                    background-color: white;
                    border: 1px solid #ccc;
                    color: #333;
                }

                .btn-outline:hover {
                    background-color: #eee;
                }

                .btn-primary {
                    background-color: #333;
                    color: white;
                }

                .btn-primary:hover {
                    background-color: #444;
                }
            `}</style>
        </div>
    );
};

export default observer(LoginPage);
