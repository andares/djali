import Base from "./Base.ts";

type Map<T> = { [K in keyof T]: Promise<T[K]> }

export default class FlexMap extends Base {
  get value(): boolean {
    return this._value;
  }

  apply(): void {}
}
