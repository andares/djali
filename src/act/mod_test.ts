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

// prepare base cmd

act("test:cmd1")
  .argument("name", null, "Enter name")
  .argument("value", "", "Enter value")
  .option("", "", "description")
  .option("-opt", "default", "description")
  .main((params) => {
    console.log(params)
  })


test({
  name: "call action",
  fn() {
    // act("abc")
    // act("abc:ddee")
    // act("abc:qqqq")
    // console.log(act().controller.select("ade"))
    // console.log(act().controller.select("abc:ddee"))


    act().main((params: object) => {
    // }).run(['help'])
    }).run(Deno.args.slice(1))

    assert(true)
  }
})

test({
  name: "get help",
  fn() {
    assert(true)
  }
})

test({
  name: "get action help",
  fn() {
    assert(true)
  }
})

test({
  name: "custom guard",
  fn() {
    assert(true)
  }
})
