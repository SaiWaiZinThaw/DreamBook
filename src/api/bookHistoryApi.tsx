import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";

export const createBookHistory= async ({bookSlug}: {bookSlug:string}) => {
    const token = getToken();
    const response: Response = await fetch(`${BaseURL}/history`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(bookSlug),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
};