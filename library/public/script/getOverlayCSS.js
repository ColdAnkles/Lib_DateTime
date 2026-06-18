"use strict";

function getOverlayCSS() {
    let activeTheme = read_data("activeTheme");
    let themeData = JSON.parse(read_data("themeData"));
    themeData = themeData[activeTheme];

    let overlayCSS = "\
    .overlayTime{\
		background-color: "+ themeData.overlayBG + ";\
	}\
    .overlayTime p{\
		color: "+ themeData.overlayText + ";\
        text-align: center;\
        font-size: 1em;\
        font-weight: bold;\
        font-style: normal;\
        font-variant: small-caps;\
	}\
	";

    return overlayCSS;
}

MTScript.registerMacro("datetime.getOverlayCSS", getOverlayCSS);