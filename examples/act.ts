// import { act } from "https://raw.githubusercontent.com/veeshan-io/djali/master/src/act/mod.ts"
import { act } from "../src/act/mod.ts"

act().main((params: object) => {
  console.log('main called')
}).run(Deno.args.slice(1))
