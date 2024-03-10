[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: nextDayOfMonth = json.get(time,"dayOfMonth")-1]
[h: nextDayOfWeek = json.get(time,"dayOfWeek")-1]
[h: lastMonthIndex = if(json.get(time,"monthOfYear")-1==-1,json.get(time,"monthOfYear"),json.length(json.get(calendar,"months"))-1)]
[h: daysLastMonth = json.get(json.get(calendar,"dayInMonth"),lastMonthIndex)]
[h: daysInWeek = json.get(calendar,"dayInWeek")]
[h, if(nextDayOfWeek == -1), code:{
	[h: nextDayOfWeek = daysInWeek-1]
	[h: time=json.set(time,"dayOfWeek",nextDayOfWeek)]
};{
	[h: time=json.set(time,"dayOfWeek",nextDayOfWeek)]
}]
[h, if(nextDayOfMonth == -1 ), code:{
	[h: nextDayOfMonth=daysLastMonth-1]
	[h: time=json.set(time,"dayOfMonth",nextDayOfMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.subMonth()]
};{
	[h: time=json.set(time,"dayOfMonth",nextDayOfMonth)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]