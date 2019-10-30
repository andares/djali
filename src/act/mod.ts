// deno fmt src/act/**/*.ts

import Controller from "./Controller.ts"
import Action from "./Action.ts"

export function act(name?: string): Action {
  !name && (name = "_default")
  let action = new Action(name)

  Controller.instance.attach(action)
  return action
}

act("help").main((_, controller?: Controller) => {
  console.log(typeof {a:1})
  console.log("help called")
})
