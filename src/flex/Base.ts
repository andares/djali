export default abstract class Base {
  constructor(protected _value: any, protected _previous?: Base | undefined) {}

  abstract apply(): void;

  get value() {
    return this._value;
  }

  get previous() {
    return this._previous;
  }
}
