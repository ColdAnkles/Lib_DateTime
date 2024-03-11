"use strict";

function write_data(data_key, data_content) {
    MTScript.setVariable("varName", data_key);
    MTScript.setVariable("varValue", data_content);
    MTScript.evalMacro("[h: setLibProperty(varName, varValue, 'Lib:DateTime')]")
}

function read_data(data_key) {
    MTScript.setVariable("varName", data_key);
    MTScript.evalMacro("[h: returnedData = getLibProperty(varName, 'Lib:DateTime')]");
    return MTScript.getVariable("returnedData");
}