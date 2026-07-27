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

            const response =
                await noteService.getNotes(userBookId);

            setNotes(response.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        notes,
        loading,
        fetchNotes,
        setNotes,
    };
}

export default useNotes;