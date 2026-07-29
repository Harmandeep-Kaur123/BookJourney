import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
    Eye,
    EyeOff,
} from "lucide-react";

function ChangePasswordCard({
    onChangePassword,
}) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] =
    useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await onChangePassword({
                currentPassword:
                    formData.currentPassword,
                newPassword:
                    formData.newPassword,
            });

            toast.success(
                "Password updated successfully."
            );

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                Security
            </h2>

            <p className="mb-6 text-sm text-gray-600">
                Change your account password.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Current Password
                    </label>

                    <div className="relative">
                        <input
                            type={
                                showPassword.current
                                    ? "text"
                                    : "password"
                            }
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border py-3 pr-12 pl-4"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                togglePassword("current")
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={
                                showPassword.current
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword.current ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        New Password
                    </label>

                    <div className="relative">
                        <input
                            type={
                                showPassword.new
                                    ? "text"
                                    : "password"
                            }
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border py-3 pr-12 pl-4"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                togglePassword("new")
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={
                                showPassword.new
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword.new ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type={
                                showPassword.confirm
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border py-3 pr-12 pl-4"
                            required
                        />
                
                        <button
                            type="button"
                            onClick={() =>
                                togglePassword("confirm")
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={
                                showPassword.confirm
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword.confirm ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    loading={loading}
                >
                    Update Password
                </Button>
            </form>
        </div>
    );
}

export default ChangePasswordCard;