
[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentSecond = json.get(time,"currentSecond") + 1]
[h: maxSecond = json.get(calendar,"secondPerMinute")]
[h: oldTime = datetime.now()]
[h, if(currentSecond == maxSecond), code:{
	[h: currentSecond=0]
	[h: time=json.set(time,"currentSecond",currentSecond)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.addMinute("false")]
};{
	[h: time=json.set(time,"currentSecond",currentSecond)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]
[h: newTime = datetime.now()]
[h, if(json.get(macro.args,0)=="true"), code:{
	[h: datetime.checkExpiry(oldTime, newTime)]
};{}]