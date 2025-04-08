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
                <h2 className="login-form__title">Enter your name</h2>

                <input
                    className="input login-form__input"
                    placeholder="Your name"
                    {...register('username', { required: true })}
                />

                <div className="login-form__buttons">
                    <button
                        type="button"
                        className="button button--outline"
                        onClick={handleCancel}
                    >
                        <span className="button__label">Cancel</span>
                    </button>
                    <button
                        type="submit"
                        className="button button--filled"
                        data-loading={authStore.isLoading}
                    >
                        <span className="button__label">Login</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default observer(LoginPage);
