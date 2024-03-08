[h, if(json.contains(macro.args,"Cancel")), code:{
	[h: vis = isFrameVisible("Advance Time")]
	[h, if(vis), code:{
		[h: closeFrame("Advance Time")]
	};{}]
	[h: return(0)]
};{
	[h: numberType="Seconds"]
	[h: selectedNumber="1"]
}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: time = getLibProperty("timeData","Lib:DateTime")]

[h: formHandler = macroLinkText("AdvanceTime@Lib:DateTime", "none")]
[h, if(json.contains(macro.args,"Advance")), code:{
	[h: oldTime= datetime.now()]
	[h: macroToRun="add"+substring(json.get(macro.args,"numberType"),0,length(json.get(macro.args,"numberType"))-1)]
	[h, count(json.get(macro.args,"selectedNumber"),""), code:{
		[h: 'broadcast("datetime."+macroToRun)']
		[h: execFunction("datetime." + macroToRun, "[false]")]
	}]
	[h: datetime.updateUI()]
	[h: vis = isFrameVisible("Advance Time")]
	[h, if(vis), code:{
		[h: closeFrame("Advance Time")]
	};{}]
	[h: newTime = datetime.now()]
	[h, if(json.contains(macro.args,"checkExpiry")), code:{
		[h: datetime.checkExpiry(oldTime, newTime)]
	};{}]
	[h: return(0)]
};{
	[h: numberType="Seconds"]
	[h: selectedNumber="1"]
}]

[frame5("Advance Time","width=200;height=100"):{
		<html>
		<head>
			<link rel="stylesheet" type="text/css" href="lib://DateTime/macro/eventCSS?cachelib=false">
		</head>
		<body>
			<form id="newEvent" action="[r: formHandler]">
			<input type='hidden' name='checkExpiry' value='checkExpiry'>
				<table width="100%">
					<tr class="headingA"><td colspan=2>Advance Time</td></tr>
					<tr align="center">
						<td><select name="selectedNumber" size="1">[r, count(30,""), code:{
							[r: if(roll.count+1==selectedNumber,"<option selected='selected'>","<option>")][r: roll.count+1]</option>
							}]
						</select></td>
						<td><select name="numberType" size="1">
							<option [r: if(numberType=="Seconds","selected='selected'","")]>Seconds</option>
							<option [r: if(numberType=="Minutes","selected='selected'","")]>Minutes</option>
							<option [r: if(numberType=="Hours","selected='selected'","")]>Hours</option>
							<option [r: if(numberType=="Days","selected='selected'","")]>Days</option>
							<option [r: if(numberType=="Months","selected='selected'","")]>Months</option>
							<option [r: if(numberType=="Years","selected='selected'","")]>Years</option>
						</select></td>
					</tr>
					<tr class="buttonRow">
						<td colspan=1><input type='submit' name='Advance' value='Advance'></td>
						<td colspan=1><input type='submit' name='Cancel' value='Cancel'></td>
					</tr>
				</table>
			</form>
		</body>
	</html>
}]

