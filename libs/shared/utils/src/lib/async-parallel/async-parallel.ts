/**
 * Implement a function in JavaScript that takes a list of async functions as input
 * and a callback function and executes the async tasks in parallel that is all at once
 * and invokes the callback after every task is executed.
 */

export function asyncParallel<T>(
  tasks: ((callback: (value: T) => void) => void)[],
  callback: (value: T[]) => void
) {
  let completed = 0;
  const result: T[] = [];
  tasks.forEach((task) => {
    task((value: T) => {
      completed++;
      result.push(value);
      if (completed >= tasks.length) {
        callback(result);
      }
    });
  });
}

export function asyncParallelPromises<T, U extends string>(
  tasks: Promise<T>[],
  callback: (errors: U[], value: T[]) => void
) {
  let completed = 0;
  const result: T[] = [];
  const errors: U[] = [];
  tasks.forEach((task) => {
    task
      .then((val) => {
        result.push(val);
      })
      .catch((err) => errors.push(err))
      .finally(() => {
        completed++;
        if (completed >= tasks.length) {
          callback(errors, result);
        }
      });
  });
}
