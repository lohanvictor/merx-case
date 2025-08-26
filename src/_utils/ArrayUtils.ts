export class ArrayUtils {
  /**
   * Retorna o último item de um array.
   * 
   * @param array O array de onde o item será retirado.
   * @returns O último item do array.
   */
  static lastItem<T>(array: Array<T>): T {
    return array[array.length - 1];
  }

  /**
   * Retorna o primeiro item de um array.
   * 
   * @param array O array de onde o item será retirado.
   * @returns O primeiro item do array.
   */
  static firstItem<T>(array: Array<T>): T {
    return array[0];
  }
}
