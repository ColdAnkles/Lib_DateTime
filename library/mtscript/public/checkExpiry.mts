<!-- Wrapper for checkExpiry.js
checkExpiry(oldTime, newTime)
causes JS to print names of events between those two times, that have the expiry flag set.
printing adheres to gm only flag, automatically exits if newTime is in the past relative to oldTime
-->

[h: oldTime=json.get(macro.args,0)]
[h: newTime=json.get(macro.args,1)]

[h: reverseTime = false]
[h, if(json.get(oldTime,"year") > json.get(newTime,"year")), code:{
	[h: reverseTime = true]
};{}]
[h, if(json.get(oldTime,"year") == json.get(newTime,"year") && json.get(oldTime,"month") > json.get(newTime,"month")), code:{
	[h: reverseTime = true]
}]
[h, if(json.get(oldTime,"year") == json.get(newTime,"year") && json.get(oldTime,"month") == json.get(newTime,"month") && json.get(oldTime,"day") > json.get(newTime,"day")), code:{
	[h: reverseTime = true]
}]
[h, if(json.get(oldTime,"year") == json.get(newTime,"year") && json.get(oldTime,"month") == json.get(newTime,"month") && json.get(oldTime,"day") == json.get(newTime,"day") && json.get(oldTime,"hour") > json.get(newTime,"hour")), code:{
	[h: reverseTime = true]
}]
[h, if(json.get(oldTime,"year") == json.get(newTime,"year") && json.get(oldTime,"month") == json.get(newTime,"month") && json.get(oldTime,"day") == json.get(newTime,"day") && json.get(oldTime,"hour") == json.get(newTime,"hour") && json.get(oldTime,"minute") > json.get(newTime,"minute")), code:{
	[h: reverseTime = true]
}]
[h, if(json.get(oldTime,"year") == json.get(newTime,"year") && json.get(oldTime,"month") == json.get(newTime,"month") && json.get(oldTime,"day") == json.get(newTime,"day") && json.get(oldTime,"hour") == json.get(newTime,"hour") && json.get(oldTime,"minute") == json.get(newTime,"minute") && json.get(oldTime,"second") > json.get(newTime,"second")), code:{
	[h: reverseTime = true]
}]


[r, if(!reverseTime), code:{
	[h: checkArgs = json.set("{}","oldYear",json.get(oldTime,"year"),"oldMonth",json.get(oldTime,"month"),"oldDay",json.get(oldTime,"day"),"oldHour",json.get(oldTime,"hour"),"oldMinute",json.get(oldTime,"minute"),"oldSecond",json.get(oldTime,"second"),"newYear",json.get(newTime,"year"),"newMonth",json.get(newTime,"month"),"newDay",json.get(newTime,"day"),"newHour",json.get(newTime,"hour"),"newMinute",json.get(newTime,"minute"),"newSecond",json.get(newTime,"second"),"calendar",getLibProperty("calendarData","Lib:DateTime"),"events",getLibProperty("eventData","Lib:DateTime"))]
	[r: js.datetime.checkExpiry(checkArgs)]
	[r: js.datetime.deleteEvents()]
	[r: datetime.cleanEvents()	
	[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
	[h: monthCache = json.get(htmlCaches, "month_"+json.get(newTime,"month"))]
	[h: monthCache = json.set(monthCache, "valid", false)]
	[h: htmlCaches = json.set(htmlCaches, "month_"+json.get(newTime,"month"), monthCache,"allValid", false)]
	[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]
	[h: datetime.updateUI(json.set("{}","eventRefresh",true,"day",json.get(newTime,"day"),"month",json.get(newTime,"month"),"year",json.get(newTime,"year"),"startDay",0))]]
};{}]