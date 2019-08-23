import { walk, walkSync } from "https://deno.land/std/fs/mod.ts"

export function* resources(dir: string,
  slice: number = 20): IterableIterator<string[]>
{
  let bundle: string[] = []
  for (const fileInfo of walkSync(dir)) {
    if (['.', '~'].find(test => fileInfo.filename[0] == test)) {
      continue
    }

    bundle.push(fileInfo.filename)
    if (bundle.length >= slice) {
      yield bundle
      bundle = []
    }
  }
  if (bundle.length) {
    yield bundle
  }
}
