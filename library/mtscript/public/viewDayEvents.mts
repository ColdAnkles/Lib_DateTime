[h: time = getLibProperty("timeData")]
[h: calendar = getLibProperty("calendarData")]
[h: events = getLibProperty("eventData")]
[h, if(events==""), code:{
	[h: events = "{}"]
	[h: todayEvents = "{}"]
};{}]
[h: yearEvents = json.get(events,json.get(macro.args,"year"))]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
	[h: todayEvents = "{}"]
};{}]
[h: monthEvents = json.get(yearEvents,json.get(macro.args,"month"))]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
	[h: todayEvents = "{}"]
};{}]
[h: todayEvents = json.get(monthEvents,json.get(macro.args,"day"))]
[h, if(todayEvents==""), code:{
	[h: todayEvents = "{}"]
};{}]
[h: dayNames = json.get(calendar,"dayNames")]
[h: dayOfWeek = math.mod(json.get(macro.args,"day")+json.get(macro.args,"startDay"),json.get(calendar,"dayInWeek"))]
[h: hourInDay = json.get(calendar,"hourPerDay")]
[frame5("Events", "width=300;height=900"):{
<html>
<head>
<link rel="stylesheet" type="text/css" href="eventCSS@Lib:DateTime">
<title>Events</title>
</head>
<body>
<table width="100%">
	<tr>
		<td colspan=3 valign="bottom" class="headingA">
			Events for [r: json.get(dayNames,dayOfWeek)]
		</td>
	</tr><tr>
		<td colspan=3 valign="bottom" class="headingA">
			[r: json.get(macro.args,"day")+1] of [r: json.get(json.get(calendar,"months"),number(json.get(macro.args,"month")))], [r: json.get(macro.args,"year")]
		<td>
	</tr>
	[r, count(hourInDay,""), code:{
		[h: hour=roll.count]
		<tr>
			<td class="headingB">
				[r: strformat("%02d",hour)]
			</td>
			<td>
				[h: hourData = json.set("{}", "hourEvents",json.get(todayEvents,strformat("%02d",hour)),"year",json.get(macro.args,"year"),"month",json.get(macro.args,"month"),"day",json.get(macro.args,"day"),"startDay",json.get(macro.args,"startDay"),"hour",strformat("%02d",hour))]
				[MACRO("DrawHourEvents@Lib:DateTime"):hourData]
			</td>
		</tr>
	}]
	[h: formHandler = macroLinkText("AddEvent@Lib:DateTime", "none")]
	<form action="[r: formHandler]">
		<td colspan=3 class="headingA">
			<input type="hidden" name="setYear" value=[r: json.get(macro.args,"year")]>
			<input type="hidden" name="setMonth" value=[r: (json.get(macro.args,"month")+1)]>
			<input type="hidden" name="setDay" value=[r: (json.get(macro.args,"day")+1)]>
			<input type="hidden" name="setEventName" value="Add New Event">
			<input type="hidden" name="setDescription" value="Event Description">			
			<input type='submit' name='Refresh' value='Add Event'>
		</td>
	</form>
</table>
</body>
</html>
}]
