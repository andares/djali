import Base from "./Base.ts";

export default class FlexArray<T> extends Base {
  get value(): Array<T> {
    return this._value;
  }

  apply(): void {}
}
