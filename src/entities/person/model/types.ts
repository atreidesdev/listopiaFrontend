type CareerType = 'actor' | 'director' | 'author';

export type Person = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  name: string;
  photoPath: string | null;
  description: string;
  birthday: string;
  country: string;
  career: CareerType[];
};
