[h: center=getViewCenter(0,";")]
[h: xCoord=getStrProp(center,"centerX")]
[h: yCoord=getStrProp(center,"centerY")]
[h: val = json.set("{}", "tokenImage", "lib://DateTime/image/compendiumB.png", "name", "GM Macros","x",xCoord,"y",yCoord)]
[h: newToken = createToken(val)]

[h: js.datetime.createGMMacros(newToken)]