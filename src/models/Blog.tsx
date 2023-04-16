export default interface Blog {
  blogId: number;
  title: string;
  url: string;
  rating: number;
}

export interface Page {
  content: Blog[];
  empty: boolean;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
