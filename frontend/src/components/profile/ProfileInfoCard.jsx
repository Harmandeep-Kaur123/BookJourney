import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../common/Button";

import { getErrorMessage } from "../../utils/getErrorMessage";

function ProfileInfoCard({
    profile,
    onSave,
}) {
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setName(profile.name);
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await onSave({
                name,
                readingGoal: profile.readingGoal,
            });

            toast.success(
                "Profile updated successfully."
            );
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Personal Information
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 text-gray-500"
                    />
                </div>

                <Button
                    type="submit"
                    loading={saving}
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default ProfileInfoCard;