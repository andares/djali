import { FetchInitSettings, MethodOption } from "../settings.ts"
import Prepared from "./Prepared.ts"

export default class Settings {

  private _url: string

  constructor(
    private _settings: Partial<FetchInitSettings>,
  ) {
  }

  get settings(): Partial<FetchInitSettings> {
    return this._settings
  }

  set settings(settings: Partial<FetchInitSettings>) {
    this._settings = settings
  }

  get url(): string {
    return this._url
  }

  set url(url: string) {
    this._url = url
  }

  get(url: string): Prepared {
    return this.prepare('GET', url)
  }

  post(url: string): Prepared {
    return this.prepare('POST', url)
  }

  put(url: string): Prepared {
    return this.prepare('PUT', url)
  }

  delete(url: string): Prepared {
    return this.prepare('DELETE', url)
  }

  patch(url: string): Prepared {
    return this.prepare('PATCH', url)
  }

  head(url: string): Prepared {
    return this.prepare('HEAD', url)
  }

  options(url: string): Prepared {
    return this.prepare('OPTIONS', url)
  }

  private prepare(method: MethodOption, url: string): Prepared {
    this.url = url
    this.settings.method = method
    return new Prepared(this)
  }
}