[h: vFunctionPrefix = "datetime."]
[h: vJSRegEx = ".*\\.js\$"]
[h: vJSNameSpace = "datetime"]
[h: js.createNS(vJSNameSpace)]
[h: libContents = library.getContents("datetime")]

[h: scripts = "[]"]
[h: imageList = "[]"]
[h, foreach(item, libContents), code:{
	[h: mtscriptMatch = matches(item, "mtscript.*")]
    [h: jsMatch = matches(item, ".*\.js")]
    [h: pngMatch = matches(item, ".*\.png")]
    [h: svgMatch = matches(item, ".*\.svg")]
    [h, if(mtscriptMatch || jsMatch), code:{
    	[h: scripts = json.append(scripts, item)]
    };{}]
    [h, if(pngMatch || svgMatch), code:{
        [h: imageList = json.append(imageList, item)]
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

[h: datetime.setup()]
[h: datetime.Create_GM_Macros()]
[h: datetime.Create_Campaign_Macros()]
[h: datetime.updateUI()]