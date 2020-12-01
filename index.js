import { dataFileStructure, skillCurves } from './helperFunctions/constants'

const data = JSON.parse(FileLib.read('hoeutilities', './data.json'));
console.log('initial data: ', JSON.stringify(data));
if (!data) {
    console.log(true);
    FileLib.write('hoeutilities', './data.json', JSON.stringify(dataFileStructure));
}
global.hoeutils = {}
global.hoeutils.data = data;

global.hoeutils.gui = new Gui();
global.hoeutils.display = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));

global.hoeutils.timerGui = new Gui();
global.hoeutils.timerDisplay = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));

import { initiateGuiMover, guiMover } from './features/guiMover';
import { getElephantLevel } from './helperFunctions/getElephantLevel';
import initiateSettings from './features/settings';
import { hoeLock } from './features/hoeLock';
initiateGuiMover();
register('renderOverlay', guiMover);

register('tick', getElephantLevel);

initiateSettings();

register('playerInteract', hoeLock);

import { apiKeyGrabber, apiKeyChatCriteria } from './features/apiKeyGrabber';
import { commandHandler } from './features/commandHandler';
import { updateColorSettings, updateUserSettings, updateImageData, updateScale } from './helperFunctions/tickUpdates';
import { calculateCollection, calculateXpGain, calcSkillProgress, getColorInRange, makeLabel, addCommas, getMaxEfficiencyYield } from './helperFunctions/smallFunctions';
import getCollections from './helperFunctions/getCollections';
import getCropRate from './helperFunctions/getCropRate';
import { standardImages, timerImage } from './helperFunctions/renderOverlays';

updateColorSettings();
updateUserSettings();
updateScale();
updateImageData();

//api key grabber
register('chat', apiKeyGrabber).setCriteria(apiKeyChatCriteria);

//command handler
register('command', commandHandler).setName('hoeutils');

//collections
getCollections(true);
register('step', getCollections).setDelay(240);

//images
register('renderOverlay', standardImages);
register('renderOverlay', timerImage);

register('step', () => {
    console.log(JSON.stringify(global.hoeutils.data.key));
    FileLib.write('hoeutilities', './data.json', JSON.stringify(global.hoeutils.data));
    //console.log(JSON.stringify(JSON.parse(FileLib.read('hoeutilities', './data.json'))));
}).setDelay(1);

//actionbar info
let hasSkyblockAddons = true;
const SkyblockAddons = Java.type("codes.biscuit.skyblockaddons.SkyblockAddons");
let renderListener = null;
skillTextField = null;
skillField = null;
try {
    renderListener = SkyblockAddons.class.getMethod("getRenderListener").invoke(SkyblockAddons.getInstance());
    skillTextField = renderListener.class.getDeclaredField("skillText");
    skillField = renderListener.class.getDeclaredField("skill");
    skillTextField.setAccessible(true);
    skillField.setAccessible(true);
} catch (error) {
    hasSkyblockAddons = false;
}
export { skillTextField, skillField, renderListener };

register('actionbar', () => {
    global.hoeutils.farmingLevelProgress = calcSkillProgress(total, next);
    
    skillCurves.forEach((level, i) => {
        if (next == level - skillCurves[i-1]) {
            global.hoeutils.farmingLevel = i;
        }
    })
    calculateXpGain(gained);
    /* inactivityTimer = 0; */
}).setCriteria('${*}+${gained} Farming (${total}/${next})${*}')

// actionbar trigger for SBA
if (hasSkyblockAddons) {
    register('actionbar', () => {
        if (skillTextField.get(renderListener) === null) return;
        
        let name = skillField.get(renderListener)?.toString();
        name = name.charAt(0) + name.slice(1).toLowerCase();
        if (name.toLowerCase() != 'farming') return;
    
        const skillText = skillTextField.get(renderListener).toString();
        const gained = Number(skillText.split("+")[1].split(" (")[0].replace(/,/g, ''));
        const xp = skillText.split(" (")[1].split(")")[0];
        const total = Number(xp.split("/")[0].replace(/,/g, ''));
        const next = Number(xp.split("/")[1].replace(/,/g, ''));
        global.hoeutils.farmingLevelProgress = calcSkillProgress(total, next);
        
        skillCurves.forEach((level, i) => {
            if (next == level - skillCurves[i-1]) {
                global.hoeutils.farmingLevel = i;
            }
        })
        calculateXpGain(gained);
        /* if (gained) inactivityTimer = 0; */
    })
}

register("tick", () => {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    const counter = heldItem.getInteger('mined_crops');
    
    let displayLines = [];
    
    global.hoeutils.display.clearLines();
    
    //updates
    updateColorSettings();
    updateUserSettings();
    updateScale();
    updateImageData();
    
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('cane', 'counter') + addCommas(counter)));
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('cane') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('cane', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'cane', 0)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('cane', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('cane', 'level') + (global.hoeutils.farmingLevel ? ((global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('cane', 'collection') + addCommas(calculateCollection('cane', counter))));
    
    } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('potato', 'counter') + addCommas(counter)))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('potato') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('potato', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'potato', 1)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('potato', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('potato', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('potato', 'collection') + addCommas(calculateCollection('potato', counter))));
    
    } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('carrot', 'counter') + addCommas(counter)))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('carrot') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('carrot', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'carrot', 1)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('carrot', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('carrot', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('carrot', 'collection') + addCommas(calculateCollection('carrot', counter))));
    
    } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'counter') + addCommas(counter)))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('wheat') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'wheat', 0)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'collection') + addCommas(calculateCollection('wheat', counter))));
    
    } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('wart', 'counter') + addCommas(counter)).setShadow(true).setScale(scale))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('wart') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('wart', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'wart', 1)))
        //if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('wart', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        //if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('wart', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('wart', 'collection') + addCommas(calculateCollection('wart', counter))));
    
        ////////////////////////////////////////////////////////////
    /* } else if (heldItem.getString('id').match(/COCO_CHOPPER/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('cocoa') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('cocoa', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'cocoa', 0)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('cocoa', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('cocoa', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('cocoa', 'collection')));
    
    } else if (heldItem.getString('id').match(/MELON_DICER/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'counter') + addCommas(counter)))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('wheat') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'wheat', 0)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'collection') + addCommas(calculateCollection('wheat', counter))));
    
    } else if (heldItem.getString('id').match(/PUMKIN_DICER/)) {
        global.hoeutils.display.setShouldRender(true)
        let cropRate
        if (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled) cropRate = getCropRate()
        if (global.hoeutils.userSettings.isCounterEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'counter') + addCommas(counter)))
        if (global.hoeutils.userSettings.isCropRateEnabled) displayLines.push(new DisplayLine(makeLabel('wheat') + cropRate + '%'))
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_efficiency') + getMaxEfficiencyYield(cropRate, 'wheat', 0)))
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')))
        if (global.hoeutils.userSettings.isFarmingLevelEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'level') + (global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')));
        if (global.hoeutils.userSettings.isCollectionEnabled) displayLines.push(new DisplayLine(makeLabel('wheat', 'collection') + addCommas(calculateCollection('wheat', counter))));
 */ 
    } else global.hoeutils.display.setShouldRender(false)
    
    displayLines.forEach((line, i) => {
        global.hoeutils.display.setLine(i, line.setShadow(true).setScale(global.hoeutils.scale))
    })
})