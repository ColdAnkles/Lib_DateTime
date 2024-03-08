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
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]