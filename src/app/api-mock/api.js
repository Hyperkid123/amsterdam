import establishments from '../../data/establishment-data.json';

export const getData = () => {
  return new Promise((res) => setTimeout(() => res(establishments), 250))
};
