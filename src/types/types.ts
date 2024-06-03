export type AuthData = {
    email: string;
    password: string;
}

export type CreateBookData = {
        title: string;
        coverImage: File;
        description: string;
        keywords: string[];
        status: string;
        categoryId: string;
        token: string;
      };