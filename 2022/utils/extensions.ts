declare global {
  interface Array<T> {
    remove(elem: T): Array<T>
  }
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
    return this.filter((e) => e !== elem)
  }
}

// Array.prototype.getDuplicates = function (arr: any[]): any[] {
//   return arr.filter((item, i) => {
//     if (arr.indexOf(item) !== i) {
//       return item
//     }
//   })
// }

export {}
