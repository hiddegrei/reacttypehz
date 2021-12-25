export default class Han {
  /**
   * @param val
   * @param a
   * @param b
   */
  public static constrain(val: number, a: number, b: number) {
    if (val < a) {
      return a;
    } if (val > b) {
      return b;
    }
    return val;
  }

  /**
   * @param val
   * @param a
   * @param b
   */
  public constrain(val: number, a: number, b: number) {
    if (val < a) {
      return a;
    } if (val > b) {
      return b;
    }
    return val;
  }

  /**
   * @param n
   * @param start1
   * @param stop1
   * @param start2
   * @param stop2
   * @param withinBounds
   */
  public static map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds: any) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return this.constrain(newval, start2, stop2);
    }
    return this.constrain(newval, stop2, start2);
  }
}
