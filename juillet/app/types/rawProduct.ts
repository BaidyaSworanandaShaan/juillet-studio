export type RawProduct = {
  id: number;
  attributes: {
    name: string;
    price: number;
    description: string;
    availability: string;
    category?: {
      data?: {
        attributes: {
          name: string;
        };
      };
    };
    images: {
      data: ImageData[];
    };
  };
};
