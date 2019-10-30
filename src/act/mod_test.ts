// RUN: deno --allow-net test src/act/**/*_test.ts src/act/**/test.ts

import {
  // runTests,
  test
} from "https://deno.land/std/testing/mod.ts"

import {
  assert,
  // assertEquals,
  assertArrayContains
} from "https://deno.land/std/testing/asserts.ts"

import { act } from "./mod.ts"

test({
  name: "base act",
  // async fn(): Promise<void> {
  fn() {
    // act("abc")
    // act("abc:ddee")
    // act("abc:qqqq")
    // console.log(act().controller.select("ade"))
    // console.log(act().controller.select("abc:ddee"))

    act("my:test")
      .argument("arg1", null, "description")
      .argument("arg2", "", "description")
      .option("a", "", "description")
      .option("opt", "default", "description")
      .main((params) => {
        console.log(params)
      })

    act().main((params: object) => {
    }).run(['help'])
    // }).run(Deno.args.slice(1))

    assert(true)
  }
})
