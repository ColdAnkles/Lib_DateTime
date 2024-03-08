[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentSecond = json.get(time,"currentSecond") - 1]
[h: maxSecond = json.get(calendar,"secondPerMinute")]
[h, if(currentSecond == -1), code:{
	[h: currentSecond = maxSecond-1]
	[h: time=json.set(time,"currentSecond",currentSecond)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.subMinute()]
};{
	[h: time=json.set(time,"currentSecond",currentSecond)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]	
}]