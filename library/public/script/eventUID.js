"use strict";

function generateUID(){
    return Math.random().toString(36).substring(2, 20);
}

MTScript.registerMacro("datetime.generateUID", generateUID);