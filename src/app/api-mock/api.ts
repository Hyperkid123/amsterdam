import get from "lodash-es/get"
import establishments from '../../data/establishment-data.json';

type FilterValue = string | number | boolean | Array<string> | Array<number> | Array<boolean>;

type FilterRule = {
  filterPath: string;
  filterValue: FilterValue;
}

export enum SortOrder {
  asc,
  desc
} 

type Sort = {
  order?: SortOrder,
  path: string
}

export type ApiFilter = {
  limit?: number;
  offset?: number;
  filters?: Array<FilterRule>;
  sort?: Sort;
}

export type EstablishmentLocation = {
  city: string;
}

export type EstablishmentItem = {
  title: string;
  trcid: string;
  location: EstablishmentLocation;
}

const filterComparator = (item: EstablishmentItem, path: string, value: FilterValue) => {
  if(Array.isArray(value)) {
    return value.some(value => filterComparator(item, path, value))
  }

  if(typeof value === 'string') {
    return get(item, path).toLocaleLowerCase().includes(value.toLocaleLowerCase())
  }

  return get(item, path) === value
}

const filterByRule = (dataset: Array<EstablishmentItem>, rule: FilterRule) => {
  const { filterPath, filterValue } = rule;
  return dataset.filter(item => filterComparator(item, filterPath, filterValue)) 
}

const chainFilters = (dataset: Array<EstablishmentItem>, filters: Array<FilterRule> = []) => {
  if(filters.length === 0) {
    return [...dataset]
  }
  const [ filter ] = filters.splice(0, 1)
  return chainFilters(filterByRule(dataset, filter), [...filters])
}

const filterBaseDataset = (dataset: Array<EstablishmentItem>, filters: Array<FilterRule>) => {
  if(filters.length === 0) {
    return dataset
  }

  return chainFilters(dataset, filters);
}

const sortCompare = (first: EstablishmentItem, second: EstablishmentItem, path: string): number => {
  const firstValue = get(first, path);
  const secondValue = get(second, path);
  if(typeof firstValue === 'string') {
    return firstValue.localeCompare(secondValue)
  }

  return firstValue < secondValue ? 1 : -1;
}

const sortData = (dataset: Array<EstablishmentItem>, { path, order }: Sort) => {
  const sortOrder = order === SortOrder.desc ? -1 : 1
  return dataset.sort((first, second) => sortCompare(first, second, path) * sortOrder)
}


export const getVenues = ({
  limit = 25,
  offset = 0,
  filters = [],
  sort
}: ApiFilter = {}): Promise<Array<EstablishmentItem>> => {
  let result = [...filterBaseDataset(establishments, filters).slice(offset, offset + limit)]
  if(sort) {
    result = sortData(result, sort)
  }
  
  return new Promise((res) => setTimeout(() => res(result), 250))
};
