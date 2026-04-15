import { Logger } from "@deno-lib/logger";

interface ILoggerAdapter {
  file: string;

  writeLog: (message: string) => void;
  writeWarning: (message: string) => void;
  writeError: (message: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(message: string) {
    this.logger.info(`[${this.file} LOG] ${message}`);
  }

  writeWarning(message: string) {
    this.logger.warn(`[${this.file} WARNING] ${message}`);
  }

  writeError(message: string) {
    this.logger.error(`[${this.file} ERROR] ${message}`);
  }
}
