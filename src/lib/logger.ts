type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;
  private readonly levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      this.config.enabled &&
      this.levels[level] >= this.levels[this.config.level]
    );
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = this.config.prefix ? `[${this.config.prefix}]` : "";
    const levelStr = level.toUpperCase().padEnd(5);

    return `${timestamp} ${levelStr} ${prefix} ${message}`;
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message);
    const consoleMethod = level === "debug" ? "log" : level;

    if (args.length > 0) {
      console[consoleMethod](formattedMessage, ...args);
    } else {
      console[consoleMethod](formattedMessage);
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log("debug", message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log("info", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log("error", message, ...args);
  }

  // Convenience method for grouped logging (like in your reducer)
  group(title: string, callback: () => void): void {
    if (!this.config.enabled) return;

    console.group(this.formatMessage("info", title));
    callback();
    console.groupEnd();
  }

  // Update configuration
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Create logger instances for different parts of the application
const createLogger = (prefix?: string): Logger => {
  return new Logger({
    enabled: process.env.NODE_ENV !== "production",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    prefix,
  });
};

// Default logger
export const logger = createLogger();

// Specialized loggers for different modules
export const transactionLogger = createLogger("Transaction");
export const apiLogger = createLogger("API");
export const uiLogger = createLogger("UI");

// Export the Logger class for custom instances
export { Logger, createLogger };
export type { LogLevel, LoggerConfig };
