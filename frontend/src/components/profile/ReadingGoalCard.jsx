import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../common/Button";

import { getErrorMessage } from "../../utils/getErrorMessage";

function ReadingGoalCard({
    profile,
    onSave,
}) {
    const [goal, setGoal] = useState(12);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setGoal(profile.readingGoal);
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await onSave({
                readingGoal: Number(goal),
            });

            toast.success(
                "Reading goal updated."
            );
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                Reading Goal
            </h2>

            <p className="mb-6 text-sm text-gray-600">
                Set how many books you want to
                complete this year.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Books per year
                    </label>

                    <input
                        type="number"
                        min={1}
                        value={goal}
                        onChange={(e) =>
                            setGoal(e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3"
                    />
                </div>

                <Button
                    type="submit"
                    loading={saving}
                >
                    Save Goal
                </Button>
            </form>
        </div>
    );
}

export default ReadingGoalCard;