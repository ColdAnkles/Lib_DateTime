<!-- viewEvent
Required a json dict containing the y/m/d/h/m/s/i data of the event in question
Displays and permits editing the name, description, and expire/gm options.
-->

[h: events = getLibProperty("eventData")]
[h: calendar = getLibProperty("calendarData")]

[h, if(json.contains(macro.args,"oldArgs")), code:{
	[h: tempVar = json.get(macro.args,"oldArgs")]
	[h: year = json.get(tempVar,"year")]
	[h: month = json.get(tempVar,"month")]
	[h: day = json.get(tempVar,"day")]
	[h: hour = json.get(tempVar,"hour")]
	[h: minute = json.get(tempVar,"minute")]
	[h: second = json.get(tempVar,"second")]
	[h: eventIndex = json.get(tempVar,"index")]
};{
	[h: year = json.get(macro.args,"year")]
	[h: month = json.get(macro.args,"month")]
	[h: day = json.get(macro.args,"day")]
	[h: hour = json.get(macro.args,"hour")]
	[h: minute = json.get(macro.args,"minute")]
	[h: second = json.get(macro.args,"second")]
	[h: eventIndex = json.get(macro.args,"index")]
}]

[h: editMode = json.contains(macro.args,"Edit")]
[h, if(editMode==""), code:{
	[h: editMode=false]
};{}]

[h: yearEvents = json.get(events,year)]
[h: monthEvents = json.get(yearEvents,month)]
[h: dayEvents = json.get(monthEvents,day)]
[h: hourEvents = json.get(dayEvents,strformat("%02d",hour))]
[h: minuteEvents = json.get(hourEvents,strformat("%02d",minute))]
[h: secondEvents = json.get(minuteEvents,strformat("%02d",second))]
[h: event = json.get(secondEvents,eventIndex)]

[h, if(json.contains(macro.args,"Delete")), code:{
	[h: oldName = json.get(event,"name")]
	[h: secondEvents = json.remove(secondEvents,eventIndex)]
	[h: minuteEvents = json.set(minuteEvents,strformat("%02d",second),secondEvents)]
	[h: hourEvents = json.set(hourEvents,strformat("%02d",minute),minuteEvents)]
	[h: dayEvents = json.set(dayEvents,strformat("%02d",hour),hourEvents)]
	[h: monthEvents = json.set(monthEvents,day,dayEvents)]
	[h: yearEvents = json.set(yearEvents,month,monthEvents)]
	[h: events = json.set(events,year,yearEvents)]
	[h: setLibProperty("eventData",events)]
	[h: vis = isFrameVisible(oldName)]
	[h, if(vis), code:{
		[h: closeFrame(oldName)]
	};{}]
	[h, if(secondEvents=="[]"), code:{
		[h: datetime.cleanEvents()]
	};{}]
	[h: datetime.updateUI(json.set("{}","eventRefresh",true,"day",day,"month",month,"year",year,"startDay",json.get(json.get(macro.args,"oldArgs"),"startDay")))]
	[h: return(0)]
};{}]

[h, if(json.contains(macro.args,"Save")), code:{
	[h: oldName = json.get(event,"name")]
	[h: event = json.set(event,"name",json.get(macro.args,"eventName"),"description",json.get(macro.args,"description"),"expire",if(json.contains(macro.args,"expires"),"true","false"),"gmOnly",if(json.contains(macro.args,"gmOnly"),"true","false"))]
	[h: secondEvents = json.set(secondEvents,eventIndex,event)]
	[h: minuteEvents = json.set(minuteEvents,strformat("%02d",second),secondEvents)]
	[h: hourEvents = json.set(hourEvents,strformat("%02d",minute),minuteEvents)]
	[h: dayEvents = json.set(dayEvents,strformat("%02d",hour),hourEvents)]
	[h: monthEvents = json.set(monthEvents,day,dayEvents)]
	[h: yearEvents = json.set(yearEvents,month,monthEvents)]
	[h: events = json.set(events,year,yearEvents)]
	[h: setLibProperty("eventData",events)]
	[h: vis = isFrameVisible(oldName)]
	[h, if(vis), code:{
		[h: closeFrame(oldName)]
	};{}]
	[h: datetime.updateUI(json.set("{}","eventRefresh",true,"day",day,"month",month,"year",year,"startDay",json.get(json.get(macro.args,"oldArgs"),"startDay")))]
	[h: return(0)]
};{}]

[h, if(json.contains(macro.args,"Close")), code:{
	[h: vis = isFrameVisible(json.get(event,"name"))]
	[h, if(vis), code:{
		[h: closeFrame(json.get(event,"name"))]
	};{}]
	[h: return(0)]
};{}]

[h: formHandler = macroLinkText("viewEvent@Lib:DateTime", "none")]

[frame5(json.get(event,"name"),"width=300;height=300"):{
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="lib://DateTime/macro/eventCSS?cachelib=false">
		</head>
		<body>
			<form id="eventView" action="[r: formHandler]">
			<input type="hidden" name="oldArgs" value=[r: if(json.contains(macro.args,"oldArgs"),json.get(macro.args,"oldArgs"),macro.args)]>
			<table width="100%">
				<tr>
					<td class="headingA" colspan=2>[r: if(editMode,"<input type='text' name='eventName' value='"+ json.get(event,"name")+"'>",json.get(event,"name"))]</td>
				</tr>
				<tr>
					<td colspan=2>[r: if(editMode,"<textarea name='description' cols=''>"+json.get(event,"description")+"</textarea>",json.get(event,"description"))]</td>
				</tr>
				<tr>
					<td class="headingB" colspan=2>[r: day+1 ] of [r: json.get(json.get(calendar,"months"),month)], [r: year] [r: strformat("%02d",hour) +":"+strformat("%02d",minute)+":"+strformat("%02d",second)]</td>
				</tr>
				<tr class="headingA">
					[h: eventExpires=json.get(event,"expire")]
					<td>Expires:</td><td>[r, if(editMode), code:{[r: "<input type='checkbox' name='expires' value='expires'"+if(eventExpires=="true","checked='checked'","")+">"]};{[r: if(eventExpires=="true","Yes","No")]}]</td>
				</tr>
				<tr class="headingB">
					[h: isGmOnly=json.get(event,"gmOnly")]
					<td>GM Only:</td><td>[r, if(editMode), code:{[r: "<input type='checkbox' name='gmOnly' value='gmOnly'"+if(isGmOnly=="true","checked='checked'","")+">"]};{[r: if(isGmOnly=="true","Yes","No")]}]</td>
				</tr>
				<tr>
					<td class="buttonRow" colspan=2>[r:if(editMode,"<input type='submit' name='Save' value='Save'>","<input type='submit' name='Edit' value='Edit'>")]<input type='submit' name='Close' value='Close'><input type='submit' name='Delete' value='Delete'></td>
				</tr>
			</table>
			</form>
		</body>
	</html>
}]
