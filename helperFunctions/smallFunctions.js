import { baseCropDrops, romanNums } from './constants';
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
export function makeLabel(crop, type) {
    if (type == 'counter') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Counter${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'max_efficiency') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Max Yield${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'level') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Farming Level${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'collection') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Collection${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'max_exp') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Exp Gain${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'total_exp') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Total Exp${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'progress') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Progress${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'exp_left') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Exp Left${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'eta') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}ETA${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'level_cap') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Level Cap${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Crop Rate${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
}
export function addCommas(str) {
    str = String(str);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function getMaxEfficiencyYield(cropRate, crop, replenishModif = 0) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    let randomDrops = 0;
    if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        randomDrops = 64*0.114 + 160*0.043 + 10*160*0.007 + 64*160*0.001;
    }
    else if (heldItem.getString('id').match(/MELON_DICER/)) {
        randomDrops = 160*0.114 + 5*160*0.043 + 50*160*0.007 + 2*160*160*0.001;
    }
    return addCommas(Math.round((cropRate/100 * baseCropDrops[crop]) * 20 * 60 * 60 - replenishModif + randomDrops))+'/h';
}
export function makeTimer(seconds, charsFromStart, amountOfChars) {
    return new Date(seconds * 1000).toISOString().substr(charsFromStart ?? 14, amountOfChars ?? 5);
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
    if (!settings.counter && global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'counter') + addCommas(counter)));
    if (!settings.cropRate && global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop) + (global.hoeutils.farmingLevel ? Math.round(cropRate*100)/100 + '%' : '&cHarvest crops...')));
    if (!settings.maxEff && global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'max_efficiency') + (global.hoeutils.farmingLevel ? getMaxEfficiencyYield(cropRate, crop, settings.replenishModif ?? 0) : '&cHarvest crops...')));
    if (!settings.collection && global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(' '+makeLabel(crop, 'collection') + addCommas(calculateCollection(crop, counter))));
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
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'level')}${global.hoeutils.farmingLevelRoman} (${global.hoeutils.farmingLevel})`));
            if (userSettings.isProgressToNextEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'progress')}${getColorInRange(global.hoeutils.skillProgress)}${global.hoeutils.skillProgress}%`));
            if (userSettings.isTotalExpEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'total_exp')}${addCommas(Math.round(global.hoeutils.totalExp*10)/10)}`));
            if (userSettings.isExpPerHourEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'max_exp')}${addCommas(global.hoeutils.hourlyXpGain)}/h`));
            if (userSettings.isExpLeftEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'exp_left')}${addCommas(global.hoeutils.expToNext)}`));
            if (userSettings.isETAToNextEnabled) 
                displayLines.push(new DisplayLine(` ${makeLabel(crop, 'eta')}${global.hoeutils.etaToNext}`));
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
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'level_cap')}${Object.keys(romanNums)[global.hoeutils.levelCap-1]} (${global.hoeutils.levelCap})`));
                if (userSettings.isProgressToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'progress')}${getColorInRange(global.hoeutils.progressToMax)}${global.hoeutils.progressToMax}%`));
                if (userSettings.isExpLeftToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'exp_left')}${addCommas(global.hoeutils.expToMax)}`));
                if (userSettings.isETAToMaxEnabled) 
                    displayLines.push(new DisplayLine(` ${makeLabel(crop, 'eta')}${global.hoeutils.etaToMax}`));
            }
            else displayLines.push(new DisplayLine(` ${global.hoeutils.colorSettings.main}You reached the level cap!`));
        }
        else displayLines.push(new DisplayLine(` &cProcessing...`));
    }
    else displayLines.push(new DisplayLine(` &cHarvest crops...`));
    return displayLines;
}