import { asyncParallel, asyncParallelPromises } from './async-parallel';

function createAsyncTask(delay: number) {
  return function (callback: (value: number) => void) {
    setTimeout(() => {
      callback(delay);
    }, delay * 1000);
  };
}

function createAsyncPromiseTask(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay > 2) {
        reject(`Error ${delay}`);
      } else {
        resolve(delay);
      }
    }, delay * 1000);
  });
}

describe('asyncParallel', () => {
  it('should execute tasks in parallel', (done) => {
    const taskList = [createAsyncTask(1), createAsyncTask(2)];
    asyncParallel(taskList, (value) => {
      expect(value).toEqual([1, 2]);
      done();
    });
  });
});

describe('asyncParallelPromises', () => {
  it('should execute promises in parallel', (done) => {
    const taskList = [createAsyncPromiseTask(1), createAsyncPromiseTask(2)];
    asyncParallelPromises(taskList, (errors, value) => {
      expect(errors).toEqual([]);
      expect(value).toEqual([1, 2]);
      done();
    });
  });

  it('should handle error in parallel', (done) => {
    const taskList = [createAsyncPromiseTask(3)];
    asyncParallelPromises(taskList, (errors, value) => {
      expect(errors).toEqual(['Error 3']);
      expect(value).toEqual([]);
      done();
    });
  });
});
