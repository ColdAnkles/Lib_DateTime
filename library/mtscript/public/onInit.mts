[h: vFunctionPrefix = "datetime."]
[h: vJSRegEx = ".*\\.js\$"]
[h: vJSNameSpace = "datetime"]
[h: js.createNS(vJSNameSpace)]
[h: libContents = library.getContents("datetime")]

[h: scripts = "[]"]
[h: dataList = "[]"]
[h, foreach(item, libContents), code:{
	[h: mtscriptMatch = matches(item, "mtscript.*")]
    [h: jsMatch = matches(item, ".*\.js")]
    [h: dataMatch = matches(item, "^public.*\.json")]
    [h, if(mtscriptMatch || jsMatch), code:{
    	[h: scripts = json.append(scripts, item)]
    };{}]
    [h, if(dataMatch), code:{
        [h: dataList = json.append(dataList, item)]
    };{}]
}]

[h, foreach(item, scripts), code:{
	[h: id = strfind(item, ".*/(.*)")]
	[h: name = replace(getGroup(id, 1, 1), ".mts", "")]
	[h: path = replace(item, "^public/", "")]
    [if(!matches(item, vJSRegex)):
        defineFunction(vFunctionPrefix + name, name + "@Lib:datetime");
        js.evalURI(vJSNameSpace, "lib://datetime/" + path)]
}]

[h: preloadedCalendars = "[]"]
[h, foreach(item, dataList), code:{
	[h: id = strfind(item, ".*/(.*)")]
	[h: name = replace(getGroup(id, 1, 1), ".json", "")]
    [h: preloadedCalendars = json.append(preloadedCalendars, name)]
}]

[h: setLibProperty("preloadedCalendars", preloadedCalendars, "Lib:DateTime")]

[h: datetime.updateUI()]