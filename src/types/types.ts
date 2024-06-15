export type AuthData = {
  email: string;
  password: string;
};

export type ProfileSetupData = {
  name: string;
  profilePicture?: File;
  countryCode: string;
  localNumber: string;
  phoneNumber?: string;
  bio?: string;
  gender: string;
};

export type CreateBookData = {
  title: string;
  coverImage: File | string;
  description: string;
  keywords: string[];
  status: string;
  categoryId: string;
};

export type profileFetchData = {
  name: string;
  email?: string;
  profilePicture?: string;
  countryCode: string;
  localNumber: string;
  bio?: string;
  gender: string;
};

export type createChapterData = {
  title: string;
  content: string;
  status: string;
  priority: number;
  slug: string;
};

export type categoryData = {
  categoryIds: string[];
};

export type updateBookType = {
  title: string;
  coverImage?: File;
  description: string;
  keywords: string[];
  status: string;
};

export type Book = {
  bookId: string;
  title: string;
  coverImage: string;
  description: string;
  slug: string;
  keywords: string[];
  status: string;
  user: {
    name: string;
    profilePicture: string;
    userId: string;
  };
  category: {
    categoryId: string;
    title: string;
    icon: string;
    priority: string;
  };
  favoriteCount: number;
  isFavorite: string;
};

export type fetchBookData = {
  items: Book[];
  meta: {
    currentPage: string;
    itemCount: string;
    itemsPerPage: string;
    totalItems: string;
    totalPages: string;
  };
};

export type Chapter = {
  chapterId: string;
  title: string;
  content: string;
  priority: number;
  status: string;
  book: Book[];
};

export type fetchChapterData = Chapter[];

export type commentData = {
  comment: string;
  slug: string;
};
