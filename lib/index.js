"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvConfig = exports.serveEnvConfig = void 0;
/**
 * Injects environment variables at runtime at route. For backend use only.
 * @param config - configuration
 */
function serveEnvConfig(exposedVars) {
    return function (req, res) {
        res.set("Content-Type", "application/javascript");
        var body = "\n      window.env = {" + (function () {
            var e_1, _a;
            var vars = [];
            try {
                for (var exposedVars_1 = __values(exposedVars), exposedVars_1_1 = exposedVars_1.next(); !exposedVars_1_1.done; exposedVars_1_1 = exposedVars_1.next()) {
                    var eVar = exposedVars_1_1.value;
                    if (process.env[eVar])
                        vars.push(eVar + ": '" + process.env[eVar] + "'");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (exposedVars_1_1 && !exposedVars_1_1.done && (_a = exposedVars_1.return)) _a.call(exposedVars_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return vars.join(",");
        })() + "};\n    ";
        res.send(body);
    };
}
exports.serveEnvConfig = serveEnvConfig;
/**
 * Loads environment variables from runtime or compile time variables. For
 * Frontend use only.
 */
function getEnvConfig() {
    // @ts-ignore
    if (window && window.env) {
        // @ts-ignore
        if (process && process.env)
            return __assign(__assign({}, process.env), window.env);
        // @ts-ignore
        else
            return window.env;
    }
    else if (process && process.env)
        return process.env;
}
exports.getEnvConfig = getEnvConfig;
