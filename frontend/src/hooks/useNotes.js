import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import noteService from "../services/note.service";
import { getErrorMessage } from "../utils/getErrorMessage";

function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = useCallback(async (userBookId) => {
        try {
            setLoading(true);

            const response = await noteService.getNotes(userBookId);

            setNotes(response.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    const createNote = async (data) => {
        const response = await noteService.createNote(data);

        setNotes((prev) => [response.data, ...prev]);

        toast.success("Note created successfully.");

        return response.data;
    };

    const updateNote = async (noteId, data) => {
        const response = await noteService.updateNote(noteId, data);

        setNotes((prev) =>
            prev.map((note) =>
                note._id === noteId ? response.data : note
            )
        );

        toast.success("Note updated successfully.");

        return response.data;
    };

    const deleteNote = async (noteId) => {
        await noteService.deleteNote(noteId);

        setNotes((prev) =>
            prev.filter((note) => note._id !== noteId)
        );

        toast.success("Note deleted successfully.");
    };

    return {
        notes,
        loading,
        fetchNotes,
        createNote,
        updateNote,
        setNotes,
        deleteNote,
    };
}

export default useNotes;
