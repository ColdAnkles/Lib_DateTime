[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: nextDayOfMonth = json.get(time,"dayOfMonth")+1]
[h: nextDayOfWeek = json.get(time,"dayOfWeek")+1]
[h: daysThisMonth = json.get(json.get(calendar,"dayInMonth"),json.get(time,"monthOfYear"))]
[h: daysInWeek = json.get(calendar,"dayInWeek")]
[h: oldTime = datetime.now()]
[h, if(nextDayOfWeek == daysInWeek), code:{
	[h: nextDayOfWeek = 0]
	[h: time=json.set(time,"dayOfWeek",nextDayOfWeek)]
};{
	[h: time=json.set(time,"dayOfWeek",nextDayOfWeek)]	
}]
[h, if(nextDayOfMonth == daysThisMonth), code:{
	[h: nextDayOfMonth=0]
	[h: time=json.set(time,"dayOfMonth",nextDayOfMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.addMonth("false")]
};{
	[h: time=json.set(time,"dayOfMonth",nextDayOfMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]

	[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
	[h: monthCache = json.get(htmlCaches, "month_"+json.get(oldTime, "month"))]
	[h: monthCache = json.set(monthCache, "valid", false)]
	[h: htmlCaches = json.set(htmlCaches, "month_"+json.get(oldTime, "month"), monthCache, "allValid", false)]
	[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]

[h, if(datetime.libraryLoaded("Lib:RLWeather")), code:{
    [h: ca.rlw.WindMove()]
    [h: ca.rlw.WeatherMove()]
}]