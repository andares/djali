// RUN: deno --allow-net test src/req/**/*_test.ts src/req/**/test.ts

import {
  // runTests,
  test,
} from "https://deno.land/std/testing/mod.ts"

import {
  assert,
  // assertEquals,
  assertArrayContains,
} from "https://deno.land/std/testing/asserts.ts"

import { req } from "./mod.ts"

test({
  name: "base request",
  async fn(): Promise<void> {
    let prepared = req({
      cache: "default",
    }).
      get("https://deno.land/images/deno_logo_3.svg").
      blob()

    let [status, received] = await prepared.receive((received, response) => {
      return [response.status, received]
    }, error => console.log(error))

    assertArrayContains([200, 304], [status])
    assert(received.size > 10)
  }
})
