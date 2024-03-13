"use strict";

function isGM() {
    MTScript.evalMacro("[h: val = isGM()]");
    return Boolean(MTScript.getVariable("val"));
}