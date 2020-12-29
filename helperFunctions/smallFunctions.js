import { baseCropDrops, romanNums, units } from './constants';
import getAPIInfo from './getAPI';
import getCropRate from './getCropRate';

export function calculateCollection(crop, counter) {
    if (!global.hoeutils.data.key) return '&cEnter &fAPI key';
    if (global.hoeutils.isCollectionError) {
        global.hoeutils.isCollectionError--;
        if (global.hoeutils.isCollectionError == 0) getAPIInfo('collection');
        return '&cAPI limit reached &f(&e' + makeTimer(global.hoeutils.isCollectionError/20, 17, 2) + 's&f)';
    }
    if (!global.hoeutils.collections[crop].API && !global.hoeutils.collections[crop]) return '&cProcessing...';
    if (['pumpkin', 'melon', 'cocoa', 'cactus', 'mushroom'].find(el => el == crop)) {
        return `${global.hoeutils.collections[crop]} (${makeTimer((Date.now()-global.hoeutils.collections.last_updated)/1000)})`
    }
    return global.hoeutils.collections[crop].API + counter - global.hoeutils.collections[crop].counter;
}
export function calculateXpGain(gained) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        global.hoeutils.hourlyXpGain = gained*20*2*60*60;
        return;
    }
    global.hoeutils.hourlyXpGain = gained*20*60*60;
}

export function getColorInRange(num) {
    if (num >= 90) return '&2';
    if (num >= 75) return '&a';
    if (num >= 50) return '&e';
    if (num >= 25) return '&6';
    if (num >= 10) return '&c';
    return '&4';
}
export function makeLabel(crop, string) {
    return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}${string}${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
}
export function addCommas(str) {
    str = String(str);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function getMaxEfficiencyYield(cropRate, crop, replenishModif = 0) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    let randomDrops = 0;
    let unit = units[global.hoeutils.settings.getSetting('Tool Info', 'Yield Unit')];
    let unitModif;
    switch(unit) {
        case '/h': 
            unitModif = 20 * 60 * 60;
            break;
        case '/event': 
            unitModif = 20 * 60 * 20;
            break;
        case '/min': 
            unitModif = 20 * 60;
            break;
        case '/s': 
            unitModif = 20;
            break;
        case '/harvest': 
            unitModif = 1;
            break;
    }
    if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        randomDrops = (64*0.00114 + 160*0.00043 + 10*160*0.00007 + 64*160*0.00001) * unitModif;
    }
    else if (heldItem.getString('id').match(/MELON_DICER/)) {
        randomDrops = (160*0.00114 + 5*160*0.00043 + 50*160*0.00007 + 2*160*160*0.00001) * unitModif;
    }
    return addCommas(Math.round((cropRate/100 * baseCropDrops[crop]) * unitModif - replenishModif + randomDrops))+unit;
}
export function makeTimer(seconds, charsFromStart, amountOfChars) {
    return new Date(seconds * 1000).toISOString().substr(charsFromStart ?? 14, amountOfChars ?? 5);
}
export function calcYaw() {
    let rawYaw = Math.round(Player.getYaw()*10)/10;
    let _baseDir = 67.5;
    let dir = '';
    if (rawYaw <= _baseDir && rawYaw >= -_baseDir) dir += 'S';
    if (rawYaw >= _baseDir+45 || rawYaw <= -_baseDir-45) dir += 'N';
    if (rawYaw >= _baseDir-45 && rawYaw <= _baseDir+90) dir += 'W';
    if (rawYaw <= -_baseDir+45 && rawYaw >= -_baseDir-90) dir += 'E';
    if (global.hoeutils.settings.getSetting('Tool Info', 'Yaw Unit') == 'Raw Data') {
        return rawYaw+(dir != '' ? ` (${dir})` : '');
    }
    else {
        if (rawYaw <= -90) {
            return Math.round(rawYaw*-10-1800)/10+'°'+(dir != '' ? ` (${dir})` : '');
        }
        else if (rawYaw >= 90) {
            return Math.round(1800-rawYaw*10)/10+'°'+(dir != '' ? ` (${dir})` : '');
        }
        else return rawYaw+'°'+(dir != '' ? ` (${dir})` : '');
    }
}
export function produceAllLines(crop, settings = {}) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag');
    const counter = heldItem.getCompoundTag('ExtraAttributes').getInteger('mined_crops');
    let cropRate = 0, displayLines = []
    if (
        (!settings.counter && global.hoeutils.userSettings.isCounterEnabled) 
        || (!settings.cropRate && global.hoeutils.userSettings.isCropRateEnabled)
        || (!settings.maxEff && global.hoeutils.userSettings.isMaxEfficiencyEnabled)
        || (!settings.collection && global.hoeutils.userSettings.isCollectionEnabled)
    ) displayLines.push(new DisplayLine(`${global.hoeutils.colorSettings[crop]}&lTool Info`));
    if ((!settings.counter || !settings.cropRate) && (global.hoeutils.userSettings.isCropRateEnabled|| global.hoeutils.userSettings.isMaxEfficiencyEnabled)) cropRate = getCropRate()
    if (!settings.counter && global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'Counter') + addCommas(counter)));
    if (!settings.cropRate && global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'Crop Rate') + (global.hoeutils.farmingLevel ? Math.round(cropRate*100)/100 + '%' : '&cHarvest crops...')));
    if (!settings.maxEff && global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'Max Yield') + (global.hoeutils.farmingLevel ? getMaxEfficiencyYield(cropRate, crop, settings.replenishModif ?? 0) : '&cHarvest crops...')));
    if (!settings.collection && global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'Collection') + addCommas(calculateCollection(crop, counter))));
    if (!settings.yaw && global.hoeutils.userSettings.isYawEnabled) displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Yaw')}${calcYaw()}`))
    return displayLines;
}
export function produceFarmingLines(crop) {
    const displayLines = [];
    const userSettings = global.hoeutils.userSettings.farmingInfo;
    if (userSettings.isLevelEnabled || userSettings.isProgressToNextEnabled || userSettings.isExpPerHourEnabled || userSettings.isTotalExpEnabled || userSettings.isExpLeftEnabled || userSettings.isETAToNextEnabled)
        displayLines.push(new DisplayLine(`${global.hoeutils.colorSettings[crop]}&lCurrent Level Info`));
    if (global.hoeutils.hourlyXpGain) {
        if (global.hoeutils.farmingLevel != global.hoeutils.levelCap) {
            if (userSettings.isLevelEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Farming Level')}${global.hoeutils.farmingLevelRoman} (${global.hoeutils.farmingLevel})`));
            if (userSettings.isProgressToNextEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Progress')}${getColorInRange(global.hoeutils.skillProgress)}${global.hoeutils.skillProgress}%`));
            if (userSettings.isTotalExpEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Total Exp')}${addCommas(Math.round(global.hoeutils.totalExp*10)/10)}`));
            if (userSettings.isExpPerHourEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Exp Yield')}${addCommas(global.hoeutils.hourlyXpGain)}/h`));
            if (userSettings.isExpLeftEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Exp Left')}${addCommas(global.hoeutils.expToNext)}`));
            if (userSettings.isETAToNextEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'ETA')}${global.hoeutils.etaToNext}`));
        }
        else displayLines.push(new DisplayLine(` ${global.hoeutils.colorSettings.main}You reached the level cap!`));
    }
    else displayLines.push(new DisplayLine(` &cHarvest crops...`));
    if (userSettings.isLevelCapEnabled || userSettings.isProgressToMaxEnabled || userSettings.isExpLeftToMaxEnabled || userSettings.isETAToMaxEnabled)
        displayLines.push(new DisplayLine(`${global.hoeutils.colorSettings[crop]}&lLevel Cap Info`));
    if (global.hoeutils.hourlyXpGain) {
        if (global.hoeutils.levelCap) {
            if (global.hoeutils.farmingLevel != global.hoeutils.levelCap) {
                if (userSettings.isLevelCapEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Level Cap')}${Object.keys(romanNums)[global.hoeutils.levelCap-1]} (${global.hoeutils.levelCap})`));
                if (userSettings.isProgressToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Progress')}${getColorInRange(global.hoeutils.progressToMax)}${global.hoeutils.progressToMax}%`));
                if (userSettings.isExpLeftToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'Exp Left')}${addCommas(global.hoeutils.expToMax)}`));
                if (userSettings.isETAToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'ETA')}${global.hoeutils.etaToMax}`));
            }
            else displayLines.push(new DisplayLine(` ${global.hoeutils.colorSettings.main}You reached the level cap!`));
        }
        else displayLines.push(new DisplayLine(` &cProcessing...`));
    }
    else displayLines.push(new DisplayLine(` &cHarvest crops...`));
    return displayLines;
}