"use strict";

function saveTheme(addThemeData) {
    let themeData = JSON.parse(read_data("themeData"));
    let newTheme = themeData["Default"];

    newTheme.themeName = addThemeData.themeName;
    if ("bodyBackground" in addThemeData) {
        newTheme.bodyBackground = addThemeData.bodyBackground;
    }
    if ("bodyTextColour" in addThemeData) {
        newTheme.bodyTextColour = addThemeData.bodyTextColour;
    }
    if ("currentDayBG" in addThemeData) {
        newTheme.currentDayBG = addThemeData.currentDayBG;
    }
    if ("otherDayBG" in addThemeData) {
        newTheme.otherDayBG = addThemeData.otherDayBG;
    }
    if ("eventDayBG" in addThemeData) {
        newTheme.eventDayBG = addThemeData.eventDayBG;
    }
    if ("eventDayText" in addThemeData) {
        newTheme.eventDayText = addThemeData.eventDayText;
    }
    if ("headingABG" in addThemeData) {
        newTheme.headingABG = addThemeData.headingABG;
    }
    if ("headingAText" in addThemeData) {
        newTheme.headingAText = addThemeData.headingAText;
    }
    if ("headingBBG" in addThemeData) {
        newTheme.headingBBG = addThemeData.headingBBG;
    }
    if ("headingBText" in addThemeData) {
        newTheme.headingBText = addThemeData.headingBText;
    }
    if ("dayRowBG" in addThemeData) {
        newTheme.dayRowBG = addThemeData.dayRowBG;
    }
    if ("buttonRowBG" in addThemeData) {
        newTheme.buttonRowBG = addThemeData.buttonRowBG;
    }
    if ("buttonRowText" in addThemeData) {
        newTheme.buttonRowText = addThemeData.buttonRowText;
    }
    if ("dayRowText" in addThemeData) {
        newTheme.dayRowText = addThemeData.dayRowText;
    }

    themeData[newTheme.themeName] = newTheme;
    write_data("themeData", JSON.stringify(themeData));
    let activeTheme = read_data("activeTheme");
    if (activeTheme == editTheme.themeName) {
        expire_calendar_cache();
    }
}

MTScript.registerMacro("datetime.saveTheme", saveTheme);

function removeTheme(removeThemeName) {
    let themeData = JSON.parse(read_data("themeData"));
    if (!(removeThemeName in themeData)) {
        return;
    }
    delete themeData[removeThemeName];
    let activeTheme = read_data("activeTheme");
    if (activeTheme == removeThemeName) {
        write_data("activeTheme", "Default");
    }
    write_data("themeData", JSON.stringify(themeData));
}

MTScript.registerMacro("datetime.removeTheme", removeTheme);

function changeActiveTheme() {
    let themeData = JSON.parse(read_data("themeData"));
    let activeTheme = read_data("activeTheme");
    let availableThemes = [];

    for (var t in themeData) {
        availableThemes.push(t);
    }

    if (availableThemes.length <= 1) {
        return;
    }

    MTScript.evalMacro("[h: ans = input(\"changeTheme|" + availableThemes.join(",") + "|Choose Theme|LIST|VALUE=STRING\")]");
    setActiveTheme(MTScript.getVariable("changeTheme"));
}

MTScript.registerMacro("datetime.changeActiveTheme", changeActiveTheme);

function setActiveTheme(themeName) {
    let themeData = JSON.parse(read_data("themeData"));
    if (themeName in themeData) {
        write_data("activeTheme", themeName);
        expire_calendar_cache();
    }
}

MTScript.registerMacro("datetime.setActiveTheme", setActiveTheme);

function editThemeStart() {
    let themeData = JSON.parse(read_data("themeData"));
    let activeTheme = read_data("activeTheme");
    let availableThemes = [];

    for (var t in themeData) {
        if (t == "Default") {
            continue;
        }
        availableThemes.push(t);
    }

    let eT = null;
    if (availableThemes.length == 0) {
        return;
    } else if (availableThemes.length == 1) {
        eT = availableThemes[0];
    } else {
        MTScript.evalMacro("[h: ans = input(\"editTheme|" + availableThemes.join(",") + "|Edit Theme|LIST|VALUE=STRING\")]");
        eT = MTScript.getVariable("editTheme");
    }
    let editThemeData = themeData[eT];
    editTheme(editThemeData);
}

MTScript.registerMacro("datetime.editThemeStart", editThemeStart);

function deleteTheme(themeName){
    let themeData = JSON.parse(read_data("themeData"));
    delete themeData[themeName];
    write_data("themeData", JSON.stringify(themeData));
}

MTScript.registerMacro("datetime.deleteTheme", deleteTheme);

function editTheme(editTheme = null) {
    let themeData = JSON.parse(read_data("themeData"));
    if (editTheme == null) {
        editTheme = themeData["Default"];
        editTheme.themeName = "New Theme";
    }
    
    if (!("oldThemeName" in editTheme)){
        editTheme.oldThemeName = editTheme.themeName;
    }

    if ("Save" in editTheme) {
        saveTheme(editTheme);
        if ("oldThemeName" in editTheme && editTheme.oldThemeName != editTheme.themeName){
            deleteTheme(editTheme.oldThemeName);
        }
        return;
    } else if ("Delete" in editTheme) {
        if (editTheme.name in themeData) {
            deleteTheme(editTheme.name);
        }
        return;
    } else if ("Close" in editTheme) {
        return;
    }

    let frameHTML = "<html><body>";

    frameHTML += "<form id=\"eventView\" action=\"macro://ThemeEditorFormHandler@Lib:DateTime/none/Impersonated?\"><table>";
    frameHTML += "<input type='hidden' name='oldThemeName' value='" + editTheme.oldThemeName + "'>";
    frameHTML += "<tr><td><b>Theme Name</b></td><td><input type='text' name='themeName' value='" + editTheme.themeName + "'></td></tr>";
    frameHTML += "<tr><td><b>Body Background</b></td><td><input type='text' name='bodyBackground' value='" + editTheme.bodyBackground + "'></td></tr>";
    frameHTML += "<tr><td><b>Body Text Colour</b></td><td><input type='text' name='bodyTextColour' value='" + editTheme.bodyTextColour + "'></td></tr>";
    frameHTML += "<tr><td><b>Current Day Background</b></td><td><input type='text' name='currentDayBG' value='" + editTheme.currentDayBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Other Day Background</b></td><td><input type='text' name='otherDayBG' value='" + editTheme.otherDayBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Event Day Background</b></td><td><input type='text' name='eventDayBG' value='" + editTheme.eventDayBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Heading A Background</b></td><td><input type='text' name='headingABG' value='" + editTheme.headingABG + "'></td></tr>";
    frameHTML += "<tr><td><b>Heading B Background</b></td><td><input type='text' name='headingBBG' value='" + editTheme.headingBBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Day Row Background</b></td><td><input type='text' name='dayRowBG' value='" + editTheme.dayRowBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Button Row Background</b></td><td><input type='text' name='buttonRowBG' value='" + editTheme.buttonRowBG + "'></td></tr>";
    frameHTML += "<tr><td><b>Event Day Text Colour</b></td><td><input type='text' name='eventDayText' value='" + editTheme.eventDayText + "'></td></tr>";
    frameHTML += "<tr><td><b>Heading A Text Colour</b></td><td><input type='text' name='headingAText' value='" + editTheme.headingAText + "'></td></tr>";
    frameHTML += "<tr><td><b>Heading B Text Colour</b></td><td><input type='text' name='headingBText' value='" + editTheme.headingBText + "'></td></tr>";
    frameHTML += "<tr><td><b>Button Row Text Colour</b></td><td><input type='text' name='buttonRowText' value='" + editTheme.buttonRowText + "'></td></tr>";
    frameHTML += "<tr><td><b>Day Row Text Colour</b></td><td><input type='text' name='dayRowText' value='" + editTheme.dayRowText + "'></td></tr>";

    frameHTML += "<tr><td colspan=2><input type='submit' name='Save' value='Save'><input type='submit' name='Close' value='Close'><input type='submit' name='Delete' value='Delete'></td></tr>";

    frameHTML += "</table></form></body></html>";

    MTScript.setVariable("frameHTML", frameHTML);
    MTScript.evalMacro("[frame5(\"Theme Editor\",\"width=350;height=650\"):{[r:frameHTML]}]")
}

MTScript.registerMacro("datetime.editTheme", editTheme);