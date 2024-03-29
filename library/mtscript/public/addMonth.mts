[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentMonth = json.get(time,"monthOfYear") + 1]
[h: monthsInYear = json.length(json.get(calendar,"months"))]
[h: oldTime = datetime.now()]
[h, if(currentMonth == monthsInYear), code:{
	[h: currentMonth=0]
	[h: time=json.set(time,"monthOfYear",currentMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.addYear("false")]
};{
	[h: time=json.set(time,"monthOfYear",currentMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]

[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
[h: oldMonthCache = json.get(htmlCaches, "month_"+json.get(oldTime, "month"))]
[h: newMonthCache = json.get(htmlCaches, "month_"+json.get(newTime, "month"))]
[h: oldMonthCache = json.set(oldMonthCache, "valid", false)]
[h: newMonthCache = json.set(newMonthCache, "valid", false)]
[h: htmlCaches = json.set(htmlCaches, "month_"+json.get(oldTime, "month"), oldMonthCache, "month_"+json.get(newTime, "month"), newMonthCache, "allValid", false)]
[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]

[h: datetime.changeSeason()]