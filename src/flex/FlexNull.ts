import Base from "./Base.ts";

export default class FlexNull extends Base {
  get value(): null | undefined {
    return this._value;
  }

  apply(): void {}
}
