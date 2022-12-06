// https://stackoverflow.com/a/41413433/6421228
declare global {
  interface Array<T> {
    remove(elem: T): Array<T> // example
    /**
     * returns duplicates as array
     * @HannesSchaletzky
     */
    duplicates(): T[]
  }
}

// example
if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
    return this.filter((e) => e !== elem)
  }
}

Array.prototype.duplicates = function () {
  return this.filter((item, i) => {
    if (this.indexOf(item) !== i) {
      return item
    }
  })
}

export {}
