export class ArrayUtils {
  static lastItem<T>(array: Array<T>): T {
    return array[array.length - 1];
  }

  static firstItem<T>(array: Array<T>): T {
    return array[0];
  }
}
