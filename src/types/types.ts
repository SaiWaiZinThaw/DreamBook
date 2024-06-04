    export type AuthData = {
        email: string;
        password: string;
    }

    export type ProfileSetupData = {
        name: string;
        profilePicture?: File;
        phoneNumber?: string;
        bio?: string;
        gender: string;}


    export type profileFetchData = {
        name: string;
        profilePicture?: string;
        phoneNumber?: string;
        bio?: string;
        gender: string;}

    export type CreateBookData = {
        title: string;
        coverImage: File | string;
        description: string;
        keywords: string[];
        status: string;
        categoryId: string;
    };
    