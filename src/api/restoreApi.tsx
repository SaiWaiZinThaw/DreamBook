import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

const restoreBook = async (bookId: number) => {
    const token = getToken();

    const response: Response = await fetch(`${BaseURL}/books/restore/${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "PATCH",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to restore the book');
    }

    return response.status;
};

export default restoreBook;

