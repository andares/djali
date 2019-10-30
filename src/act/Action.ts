import Controller from "./Controller.ts"

type DefaultValueType = string | number | null | undefined

type Argument = [string, DefaultValueType, string, Guard | undefined]

type ArgumentsList = Argument[]

type Option = [string, DefaultValueType, string, Guard | undefined]

type OptionsList = { [index: string]: Option }
type Params = { [index: string]: any }
type Guard = (value: any) => boolean
type Main = (params: Params, controller?: Controller) => any

export default class Action {
  private _controller: Controller

  private _arguments: ArgumentsList = []
  private _options: OptionsList = {}
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

  argument(
    name: string,
    defaultValue: DefaultValueType,
    description?: string,
    guard?: Guard
  ): Action {
    !description && (description = "No description yet.")
    this._arguments.push([name, defaultValue, description, guard])
    return this
  }

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

  main(main: Main): Action {
    this._main = main
    return this
  }

  call(params: string[]): [boolean, any] {
    let status = false
    let result = undefined

    if (this._main) {
      result = this._main(this.buildParams(params), this.controller)
      status = true
    }
    return [status, result]
  }

  private buildParams(params: string[]): Params {
    let newParams: Params = {}
    let options: Params = {}

    for (let i = 0; i < params.length; i++) {
      let param = params[i]

      if (param[0] == "-") {
        if (param[1] == "-") {
          !param.search("=") && (param += "=")
          let [name, value] = param.split("=")
        }
        // if (this._options[param])
      }
    }
    for (let param of params) {
    }

    return newParams
  }

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
