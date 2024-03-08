[h: time = getLibProperty("timeData")]
[h: calendar = getLibProperty("calendarData")]
[h: currentMinute = json.get(time,"currentMinute") - 1]
[h: maxMinute = json.get(calendar,"minutePerHour")]
[h, if(currentMinute == -1 ), code:{
	[h: currentMinute=maxMinute - 1]
	[h: time=json.set(time,"currentMinute",currentMinute)]
	[h: setLibProperty("timeData", time)]
	[h: datetime.subHour()]
};{
	[h: time=json.set(time,"currentMinute",currentMinute)]
	[h: setLibProperty("timeData", time)]
}]