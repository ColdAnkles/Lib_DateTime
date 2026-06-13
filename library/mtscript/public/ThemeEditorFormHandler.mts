[h: vis = isFrameVisible("Theme Editor")]
[h, if(vis), code:{
	[h: closeFrame("Theme Editor")]
};{}]
[h: js.datetime.editTheme(macro.args)]