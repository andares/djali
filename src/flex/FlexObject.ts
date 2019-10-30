import Base from "./Base.ts";

export default class FlexObject extends Base {
  get value(): object {
    return this._value;
  }

  apply(): void {}

  traverse(value?: object): void {
    !value && (value = this.value);
    for (let key in value) {
      if (typeof value[key] === "object") {
        this.traverse(value);
      } else {
      }
    }
  }
}
