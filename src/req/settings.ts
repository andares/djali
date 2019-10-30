type MethodOption = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"
type BodyType = Blob | FormData | URLSearchParams// | BufferSource
type ModeOption = "no-cors" | "cors" | "same-origin"
type CredentialsOption = "include" | "omit" | "same-origin"
type CacheOption = "default" | "no-store" | "reload" |
  "no-cache" | "force-cache" | "only-if-cached"
type RedirectOption = "follow" | "error" | "manual"
type ReferrerOption = "no-referrer" | "client"
type ReferrerPolicyOption = "no-referrer" | "no-referrer-when-downgrade" |
  'origin' | 'origin-when-cross-origin' | 'unsafe-url'

interface FetchInitSettings {
  method?: MethodOption
  headers?: Headers | object
  body?: BodyType
  mode?: ModeOption
  credentials?: CredentialsOption
  cache?: CacheOption
  redirect?: RedirectOption
  referrer?: ReferrerOption
  referrerPolicy?: ReferrerPolicyOption
  integrity?: string
  keepalive?: boolean
  // signal?: AbortSignal
}

export {
  MethodOption,
  BodyType,
  ModeOption,
  CredentialsOption,
  CacheOption,
  RedirectOption,
  ReferrerOption,
  ReferrerPolicyOption,
  FetchInitSettings,
}