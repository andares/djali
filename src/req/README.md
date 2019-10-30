# req library

## Usage

Without return value:

```javascript
import { req } from "https://raw.githubusercontent.com/veeshan-io/djali/master/src/req/mod.ts"

req({
  headers: {
    "X-Your-Extra-Header": "1",
  },
}).post("https://yourdomian.com/yourapi").
  json().
  receive((json, response) => {
    if (response.status != 200) {
      console.log(json)
    } else {
      throw new Error('Network response was not ok.')
    }
  }, error => console.log(error))
```

With return value:

```javascript
import { req } from "https://raw.githubusercontent.com/veeshan-io/djali/master/src/req/mod.ts"

let prepared = req().
  post("https://deno.land/images/deno_logo_3.svg").
  blob()

let [ok, status, blob] = await prepared.receive((blob, response) => {
  return [response.ok, response.status, blob]
}, error => console.log(error))
```
