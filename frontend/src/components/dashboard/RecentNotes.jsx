import { ArrowRight, NotebookPen } from "lucide-react";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";

function RecentNotes({ notes }) {
    return (
        <Card title="Recent Notes">
            {notes.length === 0 ? (
                <EmptyState
                    icon={NotebookPen}
                    title="No notes yet"
                    description="Capture important ideas while reading."
                />
            ) : (
                <div className="space-y-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                        >
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {note.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Page {note.page}
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                View

                                <ArrowRight
                                    size={16}
                                    className="ml-2"
                                />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}

export default RecentNotes;