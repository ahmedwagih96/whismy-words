interface MongoType {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ImageType {
  url: string;
  publicId: null | string;
}

export interface UserType extends MongoType {
  username: string;
  profilePhoto: ImageType;
  isAdmin: boolean;
  email: string;
  isAccountVerified: boolean;
  bio: string;
  posts: PostType[];
}

export interface PostType extends MongoType {
  title: string;
  description: string;
  user: UserType;
  category: string;
  image: ImageType;
  likes: string[];
  comments: CommentType[];
}

export interface CommentType extends MongoType {
  postId: string;
  user: UserType;
  text: string;
  username: string;
}

export interface CategoryType extends MongoType {
  user: string;
  title: string;
}
