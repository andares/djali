// deno fmt src/flex/**/*.ts

import Base from "./Base.ts";
import FlexObject from "./FlexObject.ts";

export function f(raw: any): Base | null {
  if (typeof raw === "object") {
    return new FlexObject(raw);
  }
  return null;
}
