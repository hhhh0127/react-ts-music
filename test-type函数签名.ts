/* ts中的函数调用签名 */
interface IFnCall {
  // 单独定义函数返回类型使用 =>，比如第一个参数，传入的是函数并且返回值为string
  // 函数签名中是使用：表示函数返回值
  // (fn: () => string, age: number): string
  // 使用泛型：那么函数的返回值根据设置的会不同
  <TWhy>(fn: () => TWhy, age: number): string
}

const foo: IFnCall = function (fn, age) {
  return '' + fn() + age
}

foo<number>(() => 11, 18)
foo<string>(() => 'sss', 18)
// 如果不传入明确的调用时的类型，类型会自动推断
foo(() => 11, 18)
