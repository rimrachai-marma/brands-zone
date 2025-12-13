export interface Team {
  id: number;
  name: string;
  designation: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}
