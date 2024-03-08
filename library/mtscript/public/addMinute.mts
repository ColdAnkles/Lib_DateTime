[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentMinute = json.get(time,"currentMinute") + 1]
[h: maxMinute = json.get(calendar,"minutePerHour")]
[h: oldTime = datetime.now()]
[h, if(currentMinute == maxMinute), code:{
	[h: currentMinute=0]
	[h: time=json.set(time,"currentMinute",currentMinute)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.addHour("false")]
};{
	[h: time=json.set(time,"currentMinute",currentMinute)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]