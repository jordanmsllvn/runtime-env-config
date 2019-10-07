// @ts-ignore
import express, { Application } from "@types/express";

/**
 * Injects environment variables at runtime at route. For backend use only.
 * @param config - configuration
 */
export function serveEnvConfig(exposedVars: string[]): any {
  return (req: any, res: any) => {
    res.set("Content-Type", "application/javascript");
    const body = `
      window.env = {${(() => {
        const vars = [];
        for (const eVar of exposedVars) {
          if (process.env[eVar]) vars.push(`${eVar}: '${process.env[eVar]}'`);
        }
        return vars.join(",");
      })()}};
    `;
    res.send(body);
  };
}

/**
 * Loads environment variables from runtime or compile time variables. For
 * Frontend use only.
 */
export function getEnvConfig() {
  // @ts-ignore
  if (window && window.env) {
    // @ts-ignore
    if (process && process.env) return { ...process.env, ...window.env };
    // @ts-ignore
    else return window.env;
  } else if (process && process.env) return process.env;
}
