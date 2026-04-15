import { COLORS } from "../../helpers/colors.ts";

export class LocalLogger {
  constructor(private file: string) {}

  writeLog(message: string) {
    console.log(`[${this.file} log] %c${message}`, COLORS.green);
  }

  writeError(message: string) {
    console.log(`[${this.file} error] %c${message}`, COLORS.red);
  }

  writeWarning(message: string) {
    console.log(`[${this.file} warning] %c${message}`, COLORS.yellow);
  }
}
