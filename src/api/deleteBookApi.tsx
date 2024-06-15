import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

export const softDeleteBook = async (bookId: number) => {
    const token = getToken();
    const response: Response = await fetch(`${BaseURL}/books/soft/${bookId.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "DELETE",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
    
      return response.status;
};

export const hardDeleteBook = async (bookId: number) => {
    const token = getToken();
    const response: Response = await fetch(`${BaseURL}/books/hard/${bookId.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "DELETE",
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
    
      return response.status;
};
