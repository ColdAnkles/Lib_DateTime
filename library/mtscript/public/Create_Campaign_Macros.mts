[h: center=getViewCenter(0,";")]
[h: xCoord=getStrProp(center,"centerX") + 1]
[h: yCoord=getStrProp(center,"centerY")]
[h: val = json.set("{}", "tokenImage", "lib://DateTime/image/compendiumB.png", "name", "Campaign Macros","x",xCoord,"y",yCoord)]
[h: newToken = createToken(val)]

[h: js.datetime.createCampaignMacros(newToken)]