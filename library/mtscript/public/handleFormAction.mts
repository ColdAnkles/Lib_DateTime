[h: "<!-- Function vs. Button Behavior -->"]
[h: vClicked = json.contains(getMacroContext(), "buttonIndex")]

[h: "<!-- Validation -->"]
[h: assert(vClicked == 0,	"handleFormAction(function[, args ...]) cannot be operated via macro button.")]
[h: assert(json.type(macro.args) == "OBJECT", "buttonIndex"), "handleFormAction(function[, args ...]) must be passed a JSON Object with a 'function' key.")]

[h: 'broadcast("<pre>handleFormAction received:<br>" + json.indent(macro.args, 2) + "</pre>")']

[h: "<!-- Translate into variables -->"]
[h: vFunction = json.get(macro.args, "function")]
[h: vArgs = json.remove(macro.args, "function")]
[h: 'broadcast(vFunction)']
[h: 'broadcast(vArgs)']

[h: vArgArray = "[]"]
[h: json.toVars(vArgs)]
[h, for(vArgNum, 0, json.length(vArgs)), code: {
	[vThisArg = json.get(json.get(vArgs, "Arg" + vArgNum), 0)]
	[vArgArray = json.append(vArgArray, vThisArg)]
}]

[h: "<!-- Function logic -->"]
[h: 'broadcast("<pre>datetime." + vFunction + "<br>" + json.indent(vArgArray, 2) + "</pre>")']
[h: execFunction("datetime." + vFunction, vArgArray)]
[h: datetime.updateUI()]