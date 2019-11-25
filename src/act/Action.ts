import Controller from "./Controller.ts"

type DefaultValueType = string | number | boolean | null | undefined

type Argument = [string, DefaultValueType, string]

type ArgumentsList = Argument[]

type Option = [string, DefaultValueType, string, Guard | undefined]

type OptionsList = { [index: string]: Option }
type Params = {
  arguments: { [index: string]: any },
  options: { [index: string]: any },
  config: Config,
}
type Config = { [index: string]: any }
type Guard = (value: any, action: Action) => boolean
type Main = (params: Params, controller?: Controller) => any

export default class Action {
  private _controller: Controller

  private _arguments: ArgumentsList = []
  private _options: OptionsList = {}
  private _config: Config = {}
  private _main: Main

  constructor(private _name: string) {}

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get controller(): Controller {
    return this._controller
  }

  set controller(controller: Controller) {
    this._controller = controller
  }

  /**
   * 设置 Action 参数
   *
   * @param {string} name
   * @param {DefaultValueType} defaultValue
   * @param {string} [description]
   * @returns {Action}
   * @memberof Action
   */
  argument(
    name: string,
    defaultValue: DefaultValueType,
    description?: string,
  ): Action {
    !description && (description = "No description yet.")
    this._arguments.push([name, defaultValue, description])
    return this
  }

  /**
   * 设置 Action 可选项
   *
   * @param {string} name
   * @param {DefaultValueType} defaultValue
   * @param {string} [description]
   * @param {Guard} [guard]
   * @returns {Action}
   * @memberof Action
   */
  option(
    name: string,
    defaultValue: DefaultValueType,
    description?: string,
    guard?: Guard
  ): Action {
    !description && (description = "No description yet.")

    let key = (name.length > 1 ? "--" : "-") + name

    this._options[key] = [name, defaultValue, description, guard]
    return this
  }

  /**
   * 设置 Action 的配置
   *
   * @param {string} name
   * @param {object} config
   * @returns {Action}
   * @memberof Action
   */
  config(
    name: string,
    config: object,
  ): Action {
    this.config[name] = config
    return this
  }

  /**
   * 设置 Action 主业务闭包
   *
   * @param {Main} main
   * @returns {Action}
   * @memberof Action
   */
  main(main: Main): Action {
    this._main = main
    return this
  }

  /**
   * 调用执行 Action
   *
   * @param {string[]} params
   * @returns {[boolean, any]}
   * @memberof Action
   */
  call(params: string[]): [boolean, any] {
    let status = false
    let result = undefined

    if (this._main) {
      let parsed = this.buildParams(params)
      if (!parsed) {
        return [status, result]
      }
      result = this._main(parsed, this.controller)
      status = true
    }
    return [status, result]
  }

  /**
   * 生成 params 供 Action 闭包调用
   *
   * @private
   * @param {string[]} params
   * @returns {(Params | undefined)}
   * @memberof Action
   */
  private buildParams(params: string[]): Params | undefined {
    let result = {
      arguments: {},
      options: {},
      config: this._config,
    }

    // init defaults
    for (let [
      name,
      value,
    ] of this._arguments) {
      result.arguments[name] = value
    }
    for (let name in this._options) {
      this._options[name] !== undefined &&
          (result.options[name] = this._options[name])
    }

    // init input
    let argumentCount = 0;
    for (let i = 0; i < params.length; i++) {
      let param = params[i]

      // 处理 option
      if (param[0] == "-") {
        !param.search("=") && (param += "=")
        let [name, value] = param.split("=")

        if (!this._options[name]) {
          throw new Error(`Options ${name} is not defined.`)
        }

        result.options[name] = value

        continue
      }

      // 处理 argument
      let name = this._arguments[argumentCount][0]
      result.arguments[name] = param
    }

    // 执行 guard
    for (let name in result.options) {
      let func = this._options[name][3];
      if (func && !func(result.options[name], this)) {
        return undefined
      }
    }

    return result
  }

  /**
   * 回调 Controller 根据参数执行
   * 这里本质上是个嫁接方法
   *
   * @param {string[]} params
   * @param {(status: boolean, result: any) => void} [callback]
   * @memberof Action
   */
  run(
    params: string[],
    callback?: (status: boolean, result: any) => void
  ): void {
    try {
      this.controller.resolve(params, callback)
    } catch (error) {
      console.log(error.message)
    }
  }
}
