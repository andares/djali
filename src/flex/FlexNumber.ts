import Base from "./Base.ts";

export default class FlexNumber extends Base {
  get value(): number {
    return this._value;
  }

  apply(): void {}
}
