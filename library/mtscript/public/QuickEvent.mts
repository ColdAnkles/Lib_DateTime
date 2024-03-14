[h, if(json.contains(macro.args,"Cancel")), code:{
	[h: vis = isFrameVisible("Quick Event")]
	[h, if(vis), code:{
		[h: closeFrame("Quick Event")]
	};{}]
	[h: return(0)]
};{}]

[h, if(json.type(macro.args) == "ARRAY"), code:{
	[h: macro.args = json.get(macro.args, 0)]
};{}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: time = getLibProperty("timeData","Lib:DateTime")]

[h: formHandler = macroLinkText("QuickEvent@Lib:DateTime", "none")]

[h: "<!-- Integration Notes -->"]
[h: "<!-- Argument is dictionary like: {'Save':'Save','setEventName':'New Quick Event','selectedNumber':10,'numberType':'Minutes'} -->"]
[h: "<!-- Add 'setExpires' to enable expiry -->"]
[h: "<!-- Add 'gmOnly' to enable expiry -->"]
[h: "<!-- Add 'setDescription' to set a description -->"]
[h, if(json.contains(macro.args,"Save")), code:{
	[h: event = json.set("{}","expire",json.contains(macro.args,"setExpire"),"name",json.get(macro.args,"setEventName"),"description",json.get(macro.args,"setDescription"))]
	[h: tempTime=datetime.noTime()]
	[h: tempString=lower(json.get(macro.args,"numberType"))]
	[h: tempTime=json.set(tempTime,substring(tempString,0,length(tempString)-1),json.get(macro.args,"selectedNumber"))]
	[h: nowTime = datetime.now()]
	[h: 'noTime = datetime.noTime()']
	[h: 'newTime = datetime.addTimeToDate(noTime,tempTime)']
	[h: newTime = datetime.addTimeToDate(nowTime,tempTime)]
	[h: 'broadcast(nowTime +" + "+ tempTime +" = "+ newTime)']
	[h: year=json.get(newTime,"year")]
	[h: month=json.get(newTime,"month")]
	[h: day=json.get(newTime,"day")]
	[h: hour=json.get(newTime,"hour")]
	[h: minute=json.get(newTime,"minute")]
	[h: second=json.get(newTime,"second")]
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
	[h: vis = isFrameVisible("Quick Event")]
	[h, if(vis), code:{
		[h: closeFrame("Quick Event")]
	};{}]
	[h: datetime.updateUI(json.set("{}","eventRefresh",true,"day",day,"month",month,"year",year,"startDay",0)))]
	[h: return(0)]
};{}]

[h, if(json.contains(macro.args,"Refresh")), code:{
	[h: setEventName=json.get(macro.args,"setEventName")]
	[h: setDescription=""]
	[h: selectedNumber=json.get(macro.args,"selectedNumber")]
	[h: numberType=json.get(macro.args,"numberType")]
	[h: setExpire=json.get(macro.args,"setExpire")]
	[h: isGmOnly=json.get(macro.args,"gmOnly")]
};{
	[h: setEventName="New Quick Event"]
	[h: setDescription=""]
	[h: numberType="Seconds"]
	[h: selectedNumber="1"]
	[h: setExpire="off"]
	[h: isGmOnly="false"]
}]

[frame5("Quick Event","width=200;height=250"):{
	<html>
		<head>
			<link rel="stylesheet" type="text/css" href="lib://DateTime/macro/eventCSS?cachelib=false">
		</head>
		<body>
			<form id="newEvent" action="[r: formHandler]">
				<table width="100%">
					<tr class="headingA"><td colspan=3><input type="text" name="setEventName" value="[r:setEventName]"></td></tr>
					<tr class="headingA">
						<td colspan=3>Now +</td>
					</tr>
					<tr align="center">
						<td><select name="selectedNumber" size="1">[r, count(30,""), code:{
							[r: if(roll.count+1==selectedNumber,"<option selected='selected'>","<option>")][r: roll.count+1]</option>
							}]
						</select></td>
						<td colspan=2><select name="numberType" size="1">
							<option [r: if(numberType=="Seconds","selected='selected'","")]>Seconds</option>
							<option [r: if(numberType=="Minutes","selected='selected'","")]>Minutes</option>
							<option [r: if(numberType=="Hours","selected='selected'","")]>Hours</option>
							<option [r: if(numberType=="Days","selected='selected'","")]>Days</option>
							<option [r: if(numberType=="Months","selected='selected'","")]>Months</option>
							<option [r: if(numberType=="Years","selected='selected'","")]>Years</option>
						</select></td>
					</tr>
					</tr>
					<tr class="headingB">
						<td colspan=2>Expires:</td>
						<td colspan=1><input type="checkbox" name="setExpire" [r: if(setExpire=="on","checked='checked'","")]></td>
					</tr>
					<tr class="headingB">
					<td colspan=2>GM Only:</td>
					<td colspan=1><input type="checkbox" name="gmOnly" value="gmOnly"[r: if(isGmOnly=="true","checked='checked'","")]></td>
					</tr>
					<tr class="buttonRow">
						<td colspan=1><input type='submit' name='Refresh' value='Refresh'></td>
						<td colspan=1><input type='submit' name='Save' value='Save'></td>
						<td colspan=1><input type='submit' name='Cancel' value='Cancel'></td>
					</tr>
				</table>
			</form>
		</body>
	</html>
}]