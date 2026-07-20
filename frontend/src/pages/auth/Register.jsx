import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import SubmitButton from "../../components/auth/SubmitButton";

import { ROUTES } from "../../constants/routes";
import { validation } from "../../utils/validation";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();

    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...userData } = data;

            const response = await registerUser(userData);

            toast.success(response.message);

            navigate(ROUTES.LOGIN, {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Create Account"
                subtitle="Start remembering what you read."
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <InputField
                        id="name"
                        label="Name"
                        placeholder="Enter your name"
                        registration={register(
                            "name",
                            validation.name
                        )}
                        error={errors.name}
                    />

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        registration={register(
                            "email",
                            validation.email
                        )}
                        error={errors.email}
                    />

                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        registration={register(
                            "password",
                            validation.password
                        )}
                        error={errors.password}
                    />

                    <InputField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        registration={register(
                            "confirmPassword",
                            {
                                required:
                                    "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            }
                        )}
                        error={errors.confirmPassword}
                    />

                    <SubmitButton loading={isSubmitting}>
                        Create Account
                    </SubmitButton>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to={ROUTES.LOGIN}
                        className="font-medium text-amber-600 hover:text-amber-700"
                    >
                        Sign In
                    </Link>
                </p>
            </AuthCard>
        </AuthLayout>
    );
}

export default Register;