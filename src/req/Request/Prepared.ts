import Settings from "./Settings.ts"

type ResponseErrorHandler = (response: Response) => void
type ResponseHandler<T> = (response: Response) => Promise<T>

type ResceiveErrorHandler = (error: TypeError) => void
type ReceivedType = ArrayBuffer | Blob | FormData | JSON | string
type ActionProcessor = (received: ReceivedType, response: Response) => any

export default class Prepared {

  private responseHandler: ResponseHandler<any>

  protected action: ActionProcessor
  protected result: any

  public response: Response

  constructor(
    private _settings: Settings,
  ) {
  }

  get settings(): Settings {
    return this._settings
  }

  set settings(settings: Settings) {
    this._settings = settings
  }

  async receive(action: ActionProcessor, error?: ResceiveErrorHandler): Promise<any> {
    let settings: object = this.settings.settings
    let prepared = fetch(this.settings.url, settings)
      .then(this.responseHandler)

    let handler = (received: any) => {
      this.result = action(received, this.response)
    }

    if (error) {
      await prepared.then(handler)
        .catch(error)
    } else {
      await prepared.then(handler)
    }
    return this.result
  }

  receiveSync(): void {

  }

  makeResponseHandler(handler: ResponseHandler<any>,
    errorHandler?: ResponseErrorHandler): void
  {
    this.responseHandler = (response: Response) => {
      this.response = response
      if (response.ok) {
        return handler(response)
      }

      if (errorHandler) {
        errorHandler(response)
      } else {
        throw new Error('Network response was not ok.')
      }
    }
  }

  json(errorHandler?: ResponseErrorHandler): Prepared {
    this.makeResponseHandler((response: Response) => response.json(),
      errorHandler)
    return this
  }

  blob(errorHandler?: ResponseErrorHandler): Prepared {
    this.makeResponseHandler((response: Response) => response.blob(),
      errorHandler)
    return this
  }

  text(errorHandler?: ResponseErrorHandler): Prepared {
    this.makeResponseHandler((response: Response) => response.text(),
      errorHandler)
    return this
  }

  arrayBuffer(errorHandler?: ResponseErrorHandler): Prepared {
    this.makeResponseHandler((response: Response) => response.arrayBuffer(),
      errorHandler)
    return this
  }

  formData(errorHandler?: ResponseErrorHandler): Prepared {
    this.makeResponseHandler((response: Response) => response.formData(),
      errorHandler)
    return this
  }
}