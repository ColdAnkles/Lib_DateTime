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