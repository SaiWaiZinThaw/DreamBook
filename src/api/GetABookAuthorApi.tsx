import BaseURL from "../services/ApiEndPoint";


const fetchABookAuthor = async (token:string, bookId:number) => {
    const response: Response = await fetch(`${BaseURL}/books/author/${bookId}` , {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "GET",
        redirect: "follow",
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error();
    }
    return result as any[];
};

export default fetchABookAuthor;