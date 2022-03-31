import * as rl from "readline";

export default (question: string) => {
    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve:(value: string) => void ) => r.question(question + ': ', a => {
      r.close()
      resolve(a)
    }))
  }