import { getVenues, SortOrder } from "./api";
import establishments from '../../data/establishment-data.json';

describe('Api', () => {
  describe('getVenues', () => {
    it('should apply limit', async () => {
      const result = await getVenues({ limit: 5 });
      expect(result.data.length).toEqual(5);
      expect(result.data).toEqual(establishments.slice(0, 5))
    });
    it('should return 25 items if no limit was specified', async () => {
      const result = await getVenues();
      expect(result.data.length).toEqual(25);
      expect(result.data).toEqual(establishments.slice(0, 25))
    });

    it('should apply limit and offset', async () => {
      const result = await getVenues({ limit: 9, offset: 10 });
      expect(result.data.length).toEqual(9);
      expect(result.data).toEqual(establishments.slice(10, 19))
    });

    it('should return array with only one item based on filter', async () => {
      const result = await getVenues({
        filters: [{
          filterPath: 'trcid',
          filterValue: 'e327a6b0-a536-4e8a-b66f-6f76170dd923'
        }]
      });
      expect(result.data.length).toEqual(1);
      expect(result[0].trcid).toEqual('e327a6b0-a536-4e8a-b66f-6f76170dd923')
    })

    it('should return empty array on filter', async () => {
      const result = await getVenues({
        filters: [{
          filterPath: 'trcid',
          filterValue: 'nonsense'
        }]
      });
      expect(result.data.length).toEqual(0);
    })

    it('should return array with only one item based on filter', async () => {
      const result = await getVenues({
        filters: [{
          filterPath: 'trcid',
          filterValue: ['e327a6b0-a536-4e8a-b66f-6f76170dd923', 'dd2bce21-6016-4f73-a7c4-1cf9a01f51c7']
        }]
      });
      expect(result.data.length).toEqual(2);
      expect(result.data[0].trcid).toEqual('e327a6b0-a536-4e8a-b66f-6f76170dd923')
      expect(result.data[1].trcid).toEqual('dd2bce21-6016-4f73-a7c4-1cf9a01f51c7')
    })

    it('should sort data by title in ascending order', async () => {
      const result = await getVenues({ limit: 10, sort: { path: 'title' } });
      result.data.forEach(({ title }, index) => {
        if (index > 0) {
          expect(title.localeCompare(result[index - 1].title)).toEqual(1)
        }
      })
    });

    it('should sort data by title in descending order', async () => {
      const result = await getVenues({ limit: 10, sort: { path: 'title', order: SortOrder.desc } });
      result.data.forEach(({ title }, index) => {
        if (index > 0) {
          expect(title.localeCompare(result[index - 1].title)).toEqual(-1)
        }
      })
    });
  });
});
