[h, if(json.contains(macro.args,"Cancel")), code:{
	[h: vis = isFrameVisible("Add New Event")]
	[h, if(vis), code:{
		[h: closeFrame("Add New Event")]
	};{}]
	[h: return(0)]
};{}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: time = getLibProperty("timeData","Lib:DateTime")]

[h: formHandler = macroLinkText("AddEvent@Lib:DateTime", "none")]

[h, if(json.contains(macro.args,"Save")), code:{
	[h: event = json.set("{}","expire",json.contains(macro.args,"setExpire"),"name",json.get(macro.args,"setEventName"),"description",json.get(macro.args,"setDescription"))]
	[h: year=json.get(macro.args,"setYear")]
	[h: month=json.get(macro.args,"setMonth")-1]
	[h: day=json.get(macro.args,"setDay")-1]
	[h: hour=json.get(macro.args,"setHour")]
	[h: minute=json.get(macro.args,"setMinute")]
	[h: second=json.get(macro.args,"setSecond")]
	[h: yearEvents = json.get(events,year)]
	[h, if(yearEvents==""), code:{[h:yearEvents="{}"]};{}]
	[h: monthEvents = json.get(yearEvents,month)]
	[h, if(monthEvents==""), code:{[h: monthEvents="{}"]};{}]
	[h: dayEvents = json.get(monthEvents,day)]
	[h, if(dayEvents==""), code:{[h: dayEvents="{}"]};{}]
	[h: hourEvents = json.get(dayEvents,strformat("%02d",hour))]
	[h, if(hourEvents==""), code:{[h: hourEvents="{}"]};{}]
	[h: minuteEvents = json.get(hourEvents,strformat("%02d",minute))]
	[h, if(minuteEvents==""), code:{[h: minuteEvents="{}"]};{}]
	[h: secondEvents = json.get(minuteEvents,strformat("%02d",second))]
	[h, if(secondEvents==""), code:{[h: secondEvents="[]"]};{}]
	[h: event = json.set(event,"name",json.get(macro.args,"setEventName"),"description",json.get(macro.args,"setDescription"),"expire",if(json.contains(macro.args,"setExpires"),"true","false"),"gmOnly",if(json.contains(macro.args,"gmOnly"),"true","false"))]
	[h: secondEvents = json.append(secondEvents,event)]
	[h: minuteEvents = json.set(minuteEvents,strformat("%02d",second),secondEvents)]
	[h: hourEvents = json.set(hourEvents,strformat("%02d",minute),minuteEvents)]
	[h: dayEvents = json.set(dayEvents,strformat("%02d",hour),hourEvents)]
	[h: monthEvents = json.set(monthEvents,day,dayEvents)]
	[h: yearEvents = json.set(yearEvents,month,monthEvents)]
	[h: events = json.set(events,year,yearEvents)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
	[h: vis = isFrameVisible("Add New Event")]
	[h, if(vis), code:{
		[h: closeFrame("Add New Event")]
	};{}]
	[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
	[h: monthCache = json.get(htmlCaches, "month_"+month)]
	[h: monthCache = json.set(monthCache, "valid", false)]
	[h: htmlCaches = json.set(htmlCaches, "month_"+month, monthCache,"allValid", false)]
	[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]
	[h: datetime.updateUI(json.set("{}","eventRefresh",true,"day",day,"month",month,"year",year,"startDay",0))]
	[h: return(0)]
};{}]

[h, if(json.contains(macro.args,"Refresh")), code:{
	[h: setEventName=json.get(macro.args,"setEventName")]
	[h: setDescription=json.get(macro.args,"setDescription")]
	[h: setYear=json.get(macro.args,"setYear")]
	[h: setMonth=json.get(macro.args,"setMonth")]
	[h: setDay=json.get(macro.args,"setDay")]
	[h: setHour=json.get(macro.args,"setHour")]
	[h: setMinute=json.get(macro.args,"setMinute")]
	[h: setSecond=json.get(macro.args,"setSecond")]
	[h: setExpire=json.get(macro.args,"setExpire")]
	[h: isGmOnly=json.get(macro.args,"gmOnly")]
};{
	[h: setEventName="New Event"]
	[h: setDescription="Event Description"]
	[h: setYear=json.get(calendar,"calendarYear")]
	[h: setMonth=(json.get(time,"monthOfYear")+1)]
	[h: setDay=(json.get(time,"dayOfMonth")+1)]
	[h: setHour=(json.get(time,"currentHour"))]
	[h: setMinute=(json.get(time,"currentMinute"))]
	[h: setSecond=(json.get(time,"currentSecond"))]
	[h: setExpire="off"]
	[h: isGmOnly="false"]
}]

[frame5("Add New Event","width=400;height=200"):{
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="lib://DateTime/macro/eventCSS?cachelib=false">
		</head>
		<body>
			<form id="newEvent" action="[r: formHandler]">
				<table width="100%">
					<tr class="headingA"><td colspan=6><input type="text" name="setEventName" value="[r:setEventName]"></td></tr>
					<tr><td colspan=6><textarea name="setDescription" cols=50 rows=4>[r:setDescription]</textarea></td></tr>
					<tr class="headingA">
						<td>Year</td><td>Month</td><td>Day</td><td>Hour</td><td>Minute</td><td>Second</td>
					</tr>
					<tr>
						<td><input type="text" name="setYear" value="[r: setYear]" size=5></td>
						[h: months = number(json.length(json.get(calendar,"months")))]
						<td><select name="setMonth" size="1">[r, count(months,""), code:{
							[r: if(roll.count+1==setMonth,"<option selected='selected'>","<option>")][r: roll.count+1]</option>
						}]
						</select></td>
						[h: dayinmonth = number(json.get(json.get(calendar,"dayInMonth"),setMonth-1))]
						<td><select name="setDay" size="1">[r, count(dayinmonth,""), code:{
							[r: if(roll.count+1==setDay,"<option selected='selected'>","<option>")][r: roll.count+1]</option>
							}]
						</select></td>
						[h: hourinday = number(json.get(calendar,"hourPerDay"))]
						<td><select name="setHour" size="1">[r, count(hourinday,""), code:{
							[r: if(roll.count==setHour,"<option selected='selected'>","<option>")][r: roll.count]</option>
							}]
						</select></td>
						[h: minuteinhour = number(json.get(calendar,"minutePerHour"))]
						<td><select name="setMinute" size="1">[r, count(minuteinhour,""), code:{
							[r: if(roll.count==setMinute,"<option selected='selected'>","<option>")][r: roll.count]</option>
							}]
						</select></td>
						[h: secondinminute = number(json.get(calendar,"secondPerMinute"))]
						<td><select name="setSecond" size="1">[r, count(secondinminute,""), code:{
							[r: if(roll.count==setSecond,"<option selected='selected'>","<option>")][r: roll.count]</option>
							}]
						</select></td>
					</tr>
					<tr class="headingB">
						<td colspan=3>Expires:</td>
						<td colspan=3><input type="checkbox" name="setExpire" [r: if(setExpire=="on","checked='checked'","")]></td>
					</tr>
					<tr class="headingB">
					<td colspan=3>GM Only:</td>
					<td colspan=3><input type="checkbox" name="gmOnly" value="gmOnly"[r: if(isGmOnly=="true","checked='checked'","")]></td>
					</tr>
					<tr class="buttonRow">
						<td colspan=2><input type='submit' name='Refresh' value='Refresh'></td>
						<td colspan=2><input type='submit' name='Save' value='Save'></td>
						<td colspan=2><input type='submit' name='Cancel' value='Cancel'></td>
					</tr>
				</table>
			</form>
		</body>
	</html>
}]
