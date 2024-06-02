export type AuthData = {
    email: string;
    password: string;
}

export type ProfileSetupData = {
    name: string;
    profilePicture?: File;
    countryCode: string;
    localNumber: string;
    phoneNumber?: string;
    bio?: string;
    gender: string;}


export type profileFetchData = {
    name: string;
    email?: string;
    profilePicture?: string;
    countryCode: string;
    localNumber: string;
    bio?: string;
    gender: string;}
