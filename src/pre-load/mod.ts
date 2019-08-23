import { resources } from './libs.ts'

const main = (url: string, dir: string): string => {
  for (let bundle of resources(dir)) {
    for (let path of bundle) {
      console.log(url + "/" + path)
    }
    console.log("\n=============================\n")
  }

  return "done."
}

let args: string[] = Deno.args.slice(1)

if (args.length < 1) {
  console.log("\nUsage:")
  console.log("\n      > Goto the project dir and run:")
  console.log("\n      deno --allow-read --allow-net https://raw.githubusercontent.com/andares/djali/master/src/pre-load/mod.ts <url>")
  Deno.exit()
}

let [ url, dir ]: string[] = args
!dir && (dir = './')

console.log(main(url, dir))