import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../common/Button";

import { getErrorMessage } from "../../utils/getErrorMessage";

function ChangePasswordCard({
    onChangePassword,
}) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

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

                    <input
                        type="password"
                        name="currentPassword"
                        value={
                            formData.currentPassword
                        }
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        New Password
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={
                            formData.newPassword
                        }
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={
                            formData.confirmPassword
                        }
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3"
                        required
                    />
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