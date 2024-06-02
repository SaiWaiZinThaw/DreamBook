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
        email?: string;
        profilePicture?: string;
        phoneNumber?: string;
        bio?: string;
        gender: string;}
    