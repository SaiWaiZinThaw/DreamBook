import { getToken } from "@/services/authService";
import BaseURL from "../services/ApiEndPoint";
import { ChapterProgressData } from "@/types/types";

const token = getToken();

export const createChapaterProgressApi = async ({ data }: { data: ChapterProgressData }) => {
    const response: Response = await fetch(`${BaseURL}/chapter-progress`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
}

export const getCurrentChapter = async () => {
    const response: Response = await fetch(`${BaseURL}/chapter-progress`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          method: "GET",
          redirect: "follow",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
}

export const fetchChapterUpdate = async (progressId: number) => {
    const response : Response = await fetch(`${BaseURL}/chapter-progress/${progressId}`, {

    })
}