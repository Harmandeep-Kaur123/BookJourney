import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import SubmitButton from "../../components/auth/SubmitButton";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

import { validation } from "../../utils/validation";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            const response = await login(data);

            toast.success(response.message);

            navigate(ROUTES.DASHBOARD, {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Login failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Welcome Back"
                subtitle="Sign in to continue your reading journey."
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        registration={register("email",validation.email)}
                        error={errors.email}
                    />

                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        registration={register("password",validation.password)}
                        error={errors.password}
                    />

                    <SubmitButton loading={isSubmitting}>
                        Sign In
                    </SubmitButton>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to={ROUTES.REGISTER}
                        className="font-medium text-amber-600 hover:text-amber-700"
                    >
                        Create one
                    </Link>
                </p>
            </AuthCard>
        </AuthLayout>
    );
}

export default Login;