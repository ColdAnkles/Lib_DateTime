[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h, if(calendar==json.null || json.length(calendar)==0), code:{
	[h: abort(0)]
};{}]
[h: dayInMonth = json.get(calendar,"dayInMonth")]
[h: dayNames = json.get(calendar,"dayNames")]
[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: dayNum=number(json.get(time,"dayOfWeek"))]
[h: showOverlayControls = getLibProperty("overlayControls","Lib:DateTime")]
[h, if(isGM()), code: {
	[h: vFormHandler = macroLinkText("handleFormAction@Lib:DateTime", "none")]
};{
	[h: vFormHandler = ""]
}]
[h, if(dayNum>7), code:{
	[h: dayNum=0]
};{}]
[overlay("timedateOverlay"): { 
<html>
<table style='margin-left:auto;margin-right:auto;overflow:auto'><tr >
<td style='font-size: 0;'>
[r, if(isGM() && showOverlayControls),code:{
	<form id="hide-overlay-controls" action="[r:vFormHandler]">
		<input type="hidden" style="height:0px; width:0px;" name="function" value="overlayControls">
		<input type="hidden" style="height:0px; width:0px;" name="Arg0" value="false">
		<input type="submit" style="height:20px; width:20px;" class="widget--button" value="-">
	</form>
};{
	<form id="reveal-overlay-controls" action="[r:vFormHandler]">
		<input type="hidden" style="height:0px; width:0px;" name="function" value="overlayControls">
		<input type="hidden" style="height:0px; width:0px;" name="Arg0" value="true">
		<input type="submit" style="height:20px; width:20px;" class="widget--button" value="+">
	</form>
}]
</td>
<td style='background-color:black'>
<p style='color:white;text-align:center'>
[r: json.get(dayNames,dayNum)], [r: json.get(time,"dayOfMonth")+1] of [r: json.get(json.get(calendar,"months"),number(json.get(time,"monthOfYear")))] [r: json.get(calendar, "calendarYear")], [r: strformat("%02d",json.get(time,"currentHour"))]:[r:strformat("%02d",json.get(time,"currentMinute"))]:[r:strformat("%02d",json.get(time,"currentSecond"))]
</p></td></tr></table>
[r, if(isGM() && showOverlayControls), code: {
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