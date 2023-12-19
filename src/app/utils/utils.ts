import { Observable, delay, of } from 'rxjs';

// Check for object property
export const isDefined = (item: unknown): boolean => {
  return item !== undefined && item !== null;
};

// Observable timeout
export const doAsyncTask = (time: number): Observable<string> => {
  return of('done').pipe(delay(time));
};

// Deep copy an object to break the reference
export const deepCopy = <T>(obj: unknown): T => {
  return JSON.parse(JSON.stringify(obj)) as T;
};

// Randomize array in-place
export const shuffleArray = <T>(array: T[]): Array<T> => {
  return array
    .map((x) => [Math.random(), x])
    .sort()
    .map(([_, x]) => x) as T[];
};
