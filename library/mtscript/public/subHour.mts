[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: currentHour = json.get(time,"currentHour") - 1]
[h: maxHour = json.get(calendar,"hourPerDay")]
[h, if(currentHour == -1), code:{
	[h: currentHour=maxHour-1]
	[h: time=json.set(time,"currentHour",currentHour)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
	[h: datetime.subDay()]
};{
	[h: time=json.set(time,"currentHour",currentHour)]
	[h: setLibProperty("timeData", time,"Lib:DateTime")]
}]