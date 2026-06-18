"use strict";

function getEventCSS() {
	let activeTheme = read_data("activeTheme");
	let themeData = JSON.parse(read_data("themeData"));
	themeData = themeData[activeTheme];

	let eventCSS = "\
    p{\
		text-align:left;\
	}\
	body{\
		font-size:12pt;\
		background-color: " + themeData.bodyBackground + ";\
		color: " + themeData.bodyTextColour + ";\
	}\
	table, th, td {\
		border: 0px solid black;\
	}\
	table.fullheight {\
		height:100%;\
	}\
	.currentDay {\
		background-color: " + themeData.currentDayBG + ";\
		text-align:center;\
	}\
	.otherDay {\
		text-align:center;\
		background-color: "+ themeData.otherDayBG + ";\
	}\
	.headingA {\
		background-color:"+ themeData.headingABG + ";\
		text-align:center;\
		color:"+ themeData.headingAText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	.headingB {\
		background-color:"+ themeData.headingBBG + ";\
		text-align:center;\
		color:"+ themeData.headingBText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	.buttonRow {\
		background-color:"+ themeData.buttonRowBG + ";\
		text-align:center;\
		color:"+ themeData.buttonRowText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	.eventCell a {\
		color: " + themeData.currentDayText + ";\
	}\
    ";

	return eventCSS;
}

MTScript.registerMacro("datetime.getEventCSS", getEventCSS);