import { ParsedQs } from 'qs';

export const normalizeSortByParam = (
  sortBy: string | string[] | ParsedQs | ParsedQs[] | undefined,
) => {
  switch (sortBy) {
    case 'Name':
      return ['name', 'ASC'];

    case 'Newest':
      return ['year', 'DESC'];

    case 'Price-Up':
      return ['fullPrice', 'ASC'];

    case 'Price-Down':
      return ['fullPrice', 'DESC'];

    default:
      return ['name', 'ASC'];
  }
};
