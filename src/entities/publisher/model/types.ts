export type Publisher = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  name: string;
  description?: string;
  logoPath: string | null;
};
