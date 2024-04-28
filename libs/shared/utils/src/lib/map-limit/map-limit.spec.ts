import { mapLimit } from './map-limit';

describe('mapLimit', () => {
  it('should map iterate function with limit', (done) => {
    const res = mapLimit([1, 2, 3, 4, 5], 3, (num, callback) => {
      setTimeout(function () {
        num = num * 2;
        console.log(num);
        callback(null, num);
      }, 2000);
    });
    res
      .then((res) => {
        expect(res).toEqual([2, 4, 6, 8, 10]);
        done();
      })
      .catch(() => done());
  });
});
