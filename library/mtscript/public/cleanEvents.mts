<!-- cleanEvents()
Runs through every sub-dict in the events dict, empty dicts/arrays are removed, depth first.
Results in an events dict with only populated sub-dicts.
-->

[h: events = getLibProperty("eventData","Lib:DateTime")]


[h, if(events==""), code:{
	[h: events = "{}"]
};{}]

[h, FOREACH(year, events, ""), code:{
	[h: datetime.cleanYearEvents(year)]
}]