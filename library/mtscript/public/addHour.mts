[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentHour = json.get(time,"currentHour") + 1]
[h: maxHour = json.get(calendar,"hourPerDay")]
[h: oldTime = datetime.now()]
[h, if(currentHour == maxHour), code:{
	[h: currentHour=0]
	[h: time=json.set(time,"currentHour",currentHour)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.addDay("false")]
};{
	[h: time=json.set(time,"currentHour",currentHour)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]