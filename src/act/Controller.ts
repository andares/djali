import Action from "./Action.ts"

export default class Controller {
  private static _instance: Controller

  private actions: Action[] = []

  private attached: object = {}

  // constructor(
  // ) {
  // }

  static get instance(): Controller {
    !this._instance && (this._instance = new Controller())
    return this._instance
  }

  attach(action: Action): Action {
    let cursor = this.attached
    for (let node of action.name.split(":")) {
      cursor[node] == undefined && (cursor[node] = {})
      cursor = cursor[node]
    }
    cursor["_action"] = action

    action.controller = this
    this.actions.push(action)
    return action
  }

  select(name: string): Action | undefined {
    let cursor = this.attached
    for (let node of name.split(":")) {
      if (cursor[node] == undefined) {
        return undefined
      }
      cursor = cursor[node]
    }

    if (cursor["_action"] == undefined) {
      return undefined
    }

    return cursor["_action"]
  }

  resolve(
    params: string[],
    callback?: (status: boolean, result: any) => void
  ): void {
    let name = params[0]
    if (!name) {
      throw new Error("Action name is lost.")
    }

    let action = this.select(name)
    let result = action.call(params.slice(1))
    callback && callback(...result)
  }
}
