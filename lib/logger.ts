/**
 * Simple logger utility that only logs in development
 * In production, errors are silently handled to avoid exposing internal details
 */

type LogLevel = 'log' | 'warn' | 'error' | 'info'

function shouldLog(): boolean {
  return process.env.NODE_ENV === 'development'
}

export const logger = {
  log: (...args: unknown[]) => {
    if (shouldLog()) {
      console.log(...args)
    }
  },
  warn: (...args: unknown[]) => {
    if (shouldLog()) {
      console.warn(...args)
    }
  },
  error: (...args: unknown[]) => {
    if (shouldLog()) {
      console.error(...args)
    }
  },
  info: (...args: unknown[]) => {
    if (shouldLog()) {
      console.info(...args)
    }
  },
}
