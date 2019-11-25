import Action from "./Action.ts"

/**
 * 路由控制器
 * 目前仅以单例形式使用
 */
export default class Controller {
  private static _instance: Controller

  private actions: Action[] = []

  private attached: object = {}

  // constructor(
  // ) {
  // }

  /**
   * 获取单例
   *
   * @readonly
   * @static
   * @type {Controller}
   * @memberof Controller
   */
  static get instance(): Controller {
    !this._instance && (this._instance = new Controller())
    return this._instance
  }

  /**
   * 绑定 Action
   *
   * @param {Action} action
   * @returns {Action}
   * @memberof Controller
   */
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

  /**
   * 根据名字获取一个 Action
   *
   * @param {string} name
   * @returns {(Action | undefined)}
   * @memberof Controller
   */
  select(name: string): Action | undefined {
    let cursor = this.attached
    for (let node of name.split(":")) {
      if (cursor[node] == undefined) {
        return undefined
      }
      cursor = cursor[node]
    }

    return cursor["_action"]
  }

  /**
   * 执行一个指令
   *
   * @param {string[]} params
   * @param {(status: boolean, result: any) => void} [callback]
   * @memberof Controller
   */
  resolve(
    params: string[],
    callback?: (status: boolean, result: any) => void
  ): void {
    let name = params[0]
    if (!name) {
      throw new Error("Action name is lost.")
    }

    let action = this.select(name)
    if (!action) {
      throw new Error(`Action [${name}] is not attached.`)
    }
    let result = action.call(params.slice(1))
    callback && callback(...result)
  }
}
