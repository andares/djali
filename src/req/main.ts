/**
 * Wrap with fetch api, fetch document is here:
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */

import { FetchInitSettings } from "./settings.ts"
import * as Request from "./Request/mod.ts"

let catcher: (error: TypeError) => void =
    (error: TypeError) => console.error(error.message)

export function req(
  settings: Partial<FetchInitSettings> = {},
): Request.Settings {
  return new Request.Settings(settings)
}
