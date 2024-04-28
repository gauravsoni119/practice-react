/**
 * Implement mapLimit async function
 * @description
 * Implement a mapLimit function that is similar to the Array.map() which returns a promise that
 * resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs.
 * It also accepts a limit to decide how many operations can occur at a time.
 *
 * The asynchronous iteratee function will accept a input and a callback.
 * The callback function will be called when the input is finished processing,
 * the first argument of the callback will be the error flag and the second will be the result.
 *
 * @link https://learnersbucket.com/examples/interview/implement-maplimit-async-function/
 */

function createSubArray<T>(input: T[], limit: number) {
  let index = 0;
  const subarray = [];
  while (index < input.length) {
    subarray.push(input.slice(index, index + limit));
    index += limit;
  }
  return subarray;
}

export function mapLimit<T>(
  input: T[],
  limit: number,
  iterate: (item: T, cb: (error: null | Error, result: T) => void) => void
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const arrayByLimit = createSubArray(input, limit);
    const final = arrayByLimit.reduce((acc, subarray) => {
      return acc.then((val) => {
        return new Promise((res, rej) => {
          const tasks = [] as T[];
          let completed = 0;
          const result = (error: null | Error, value: T) => {
            if (error) {
              rej(error);
            } else {
              tasks.push(value);
              completed++;
              if (completed >= subarray.length) {
                res([...val, ...tasks]);
              }
            }
          };
          subarray.forEach((item) => iterate(item, result));
        });
      });
    }, Promise.resolve([] as T[]));

    final.then((result) => resolve(result)).catch((err) => reject(err));
  });
}
