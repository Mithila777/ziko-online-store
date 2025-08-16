export type Review = {
  id: string;
  rating: number;
  comment?: string;
  user: {
  id: string;
  name: string;
  image?: string;
  };
};