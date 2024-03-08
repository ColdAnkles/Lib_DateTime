[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentMonth = json.get(time,"monthOfYear") - 1]
[h: monthsInYear = json.length(json.get(calendar,"months"))]
[h, if(currentMonth == -1), code:{
	[h: currentMonth=monthsInYear-1]
	[h: time=json.set(time,"monthOfYear",currentMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.subYear()]
};{
	[h: time=json.set(time,"monthOfYear",currentMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]