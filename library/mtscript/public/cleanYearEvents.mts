<!-- cleanYearEvents(year)-->
[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: year = json.get(macro.args,0)]

[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]

[h, FOREACH(month, yearEvents, ""), code:{
	[h: datetime.cleanMonthEvents(year,month)]
}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]

[h, if(yearEvents=="{}"), code:{
	[h: events = json.remove(events, year)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
};{}]
