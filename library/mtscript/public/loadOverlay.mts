[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h, if(calendar==json.null || json.length(calendar)==0), code:{
	[h: abort(0)]
};{}]
[h: dayInMonth = json.get(calendar,"dayInMonth")]
[h: dayNames = json.get(calendar,"dayNames")]
[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: dayNum=number(json.get(time,"dayOfWeek"))]
[h, if(isGM()), code: {
	[h: vFormHandler = macroLinkText("handleFormAction@Lib:DateTime", "none")]
}]
[h, if(dayNum>7), code:{
	[h: dayNum=0]
};{}]
[overlay("timedateOverlay"): { 
<html>
<p style='color:white;text-align:center'>
<span style='background-color:black'>
[r: json.get(dayNames,dayNum)], [r: json.get(time,"dayOfMonth")+1] of [r: json.get(json.get(calendar,"months"),number(json.get(time,"monthOfYear")))] [r: json.get(calendar, "calendarYear")], [r: strformat("%02d",json.get(time,"currentHour"))]:[r:strformat("%02d",json.get(time,"currentMinute"))]:[r:strformat("%02d",json.get(time,"currentSecond"))]
</span>
</p>
[r, if(isGM()), code: {
	<table style='margin-left:auto;margin-right:auto'>
		<tr>
		<td><form id="sub-hour" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="subHour">
			<input type="hidden" name="Arg0" value="false">
			<input type="submit" class="widget--button" value="-H">
		</form></td>	
		<td><form id="sub-minute" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="subMinute">
			<input type="hidden" name="Arg0" value="false">
			<input type="submit" class="widget--button" value="-m">
		</form></td>
		<td><form id="sub-second" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="subSecond">
			<input type="hidden" name="Arg0" value="false">
			<input type="submit" class="widget--button" value="-s">
		</form></td>
		<td><form id="plus-hour" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="addHour">
			<input type="hidden" name="Arg0" value="true">
			<input type="submit" class="widget--button" value="+H">
		</form></td>		
		<td><form id="plus-hour" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="addMinute">
			<input type="hidden" name="Arg0" value="true">
			<input type="submit" class="widget--button" value="+m">
		</form></td>		
		<td><form id="plus-hour" action="[r:vFormHandler]">
			<input type="hidden" name="function" value="addSecond">
			<input type="hidden" name="Arg0" value="true">
			<input type="submit" class="widget--button" value="+s">
		</form></td>
		</tr>
	</table>
}]
</html>
}]