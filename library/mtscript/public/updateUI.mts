[h: arguments = json.get(macro.args,0)]

[h: vOverlay = isOverlayRegistered("timedateOverlay")]
[h: execLink(macroLinkText("loadOverlay@" + getMacroLocation(), "none", ""), 0, "all")]
[h, if(vOverlay): datetime.loadOverlay()]
[h: vis =  isFrameVisible("Calendar")]
[h, if(vis), code:{
	[MACRO("DrawCalendar@Lib:DateTime") : "{ParentToken:'Lib:DateTime'}"]
}]
[h: vis =  (isFrameVisible("Events") && json.contains(arguments,"eventRefresh"))]
[h, if(vis), code:{
	[h: dayArgs = json.set("{}","year",json.get(arguments,"year"),"month",json.get(arguments,"month"),"day",json.get(arguments,"day"),"startDay",json.get(arguments,"startDay"))]
	[MACRO("viewDayEvents@Lib:DateTime"): dayArgs]
}]