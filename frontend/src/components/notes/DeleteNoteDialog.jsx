import Button from "../common/Button";
import Modal from "../common/Modal";

function DeleteNoteDialog({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
}) {
    return (
        <Modal
            isOpen={isOpen}
            title="Delete Note"
            onClose={onClose}
        >
            <div className="space-y-6">
                <p className="text-gray-600">
                    Are you sure you want to delete this note?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteNoteDialog;