[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: oldTime = datetime.now()]
[h: currentYear = json.get(calendar,"calendarYear") + 1]
[h: calendar=json.set(calendar,"calendarYear",currentYear)]
[h: calendar=json.set(calendar,"lastYearStartDay",json.get(calendar,"yearStartDay"))]
[h: calendar=json.set(calendar,"yearStartDay",json.get(calendar,"nextYearStartDay"))]
[h: setLibProperty("calendarData", calendar,"Lib:DateTime")]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]

[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
[h: htmlCaches = json.set(htmlCaches, "allValid", false, "yearValid", false)]
[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]