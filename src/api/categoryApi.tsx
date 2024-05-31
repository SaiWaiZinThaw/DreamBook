import BaseURL from "../services/ApiEndPoint";

const fetchCategories = async () => {
    const response:Response = await fetch(`${BaseURL}/categories`);
    const result = await response.json();
    if(!response.ok) {
        throw new Error();
    }
    return result as any[];
};

export default fetchCategories;