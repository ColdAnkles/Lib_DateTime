<!-- cleanDayEvents(year,month,day)-->
[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: year = json.get(macro.args,0)]
[h: month = json.get(macro.args,1)]
[h: day = json.get(macro.args,2)]


[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]
[h: monthEvents = json.get(yearEvents,month)]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
};{}]
[h: dayEvents = json.get(monthEvents,day)]
[h, if(dayEvents==""), code:{
	[h: dayEvents = "{}"]
};{}]

[h, FOREACH(hour, dayEvents, ""), code:{
	[h: datetime.cleanHourEvents(year,month,day,hour)]
}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]
[h: monthEvents = json.get(yearEvents,month)]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
};{}]
[h: dayEvents = json.get(monthEvents,day)]
[h, if(dayEvents==""), code:{
	[h: dayEvents = "{}"]
};{}]

[h, if(dayEvents=="{}"), code:{
	[h: monthEvents = json.remove(monthEvents, day)]
	[h: yearEvents = json.set(yearEvents, month, monthEvents)]
	[h: events = json.set(events, year, yearEvents)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
};{}]
