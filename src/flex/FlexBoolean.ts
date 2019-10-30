import Base from "./Base.ts";

export default class FlexBoolean extends Base {
  get value(): boolean {
    return this._value;
  }

  apply(): void {}
}
