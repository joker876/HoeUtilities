import { dataFileStructure, collections } from './helperFunctions/constants'

let data = JSON.parse(FileLib.read('hoeutilities', './data.json'));
if (!data) {
    FileLib.write('hoeutilities', './data.json', JSON.stringify(dataFileStructure));
    data = JSON.parse(FileLib.read('hoeutilities', './data.json'));
}
global.hoeutils = { data, debug: { exp: {} } };

global.hoeutils.metadata = JSON.parse(FileLib.read('hoeutilities', './metadata.json'));

global.hoeutils.gui = new Gui();
global.hoeutils.display = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));
global.hoeutils.timerDisplay = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));

global.hoeutils.collections = collections;

import { initiateGuiMover, guiMover } from './features/guiMover';
import { getElephantLevel } from './helperFunctions/getElephantLevel';
import   initiateSettings from './features/settings';
import { hoeLock } from './features/hoeLock';
initiateGuiMover();
register('renderOverlay', guiMover);

register('tick', getElephantLevel);

initiateSettings();

register('playerInteract', hoeLock);

import { apiKeyGrabber, apiKeyChatCriteria } from './features/apiKeyGrabber';
import   anitaBonusGrabber from './helperFunctions/anitaBonusGrabber';
import { commandHandler } from './features/commandHandler';
import { updateColorSettings, updateUserSettings, updateImageData, updateScale } from './helperFunctions/tickUpdates';
import { produceAllLines } from './helperFunctions/smallFunctions';
import { getCollections } from './helperFunctions/getAPI';
import { standardImages, timerImage } from './helperFunctions/renderOverlays';
import   getFarmingInfo from './helperFunctions/getFarmingInfo';

updateColorSettings();
updateUserSettings();
updateScale();
updateImageData();

//api key grabber
register('chat', apiKeyGrabber).setCriteria(apiKeyChatCriteria);

//anita bonus grabber
register('chat', anitaBonusGrabber).setCriteria('${message}');

//command handler
register('command', commandHandler).setName('hoeutils');

//collections
getCollections(true);
register('step', getCollections).setDelay(240);

//images
register('renderOverlay', standardImages);
register('renderOverlay', timerImage);

register('step', () => {
    if (!global.hoeutils.stopData) FileLib.write('hoeutilities', './data.json', JSON.stringify(global.hoeutils.data));
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    const counter = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes').getInteger('mined_crops');
    if (heldItem.getString('id').match(/HOE_CANE/) && global.hoeutils.collections.cane.counter == 0) {
        global.hoeutils.collections.cane.counter = counter;
    }
    if (heldItem.getString('id').match(/HOE_POTATO/) && global.hoeutils.collections.potato.counter == 0) {
        global.hoeutils.collections.potato.counter = counter;
    }
    if (heldItem.getString('id').match(/HOE_CARROT/) && global.hoeutils.collections.carrot.counter == 0) {
        global.hoeutils.collections.carrot.counter = counter;
    }
    if (heldItem.getString('id').match(/HOE_WHEAT/) && global.hoeutils.collections.wheat.counter == 0) {
        global.hoeutils.collections.wheat.counter = counter;
    }
    if (heldItem.getString('id').match(/HOE_WARTS/) && global.hoeutils.collections.potato.counter == 0) {
        global.hoeutils.collections.potato.counter = counter;
    }
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

register('actionbar', (gained, total, current) => {
    global.hoeutils.debug.wasVanillaActionbarDetected = true;
    getFarmingInfo(current, total, gained);
}).setCriteria('${*}+${gained} Farming (${total}/${current})${*}')

// actionbar trigger for SBA
if (hasSkyblockAddons) {
    global.hoeutils.debug.wasSBAActionbarDetected = true;
    
    register('actionbar', () => {
        if (skillTextField.get(renderListener) === null) return;
        global.hoeutils.debug.exp.stages = [];
        global.hoeutils.debug.exp.stages.push('completed'); //0

        let name = skillField.get(renderListener)?.toString();
        if (name === undefined) return;
        name = name.charAt(0) + name.slice(1).toLowerCase();
        if (name.toLowerCase() != 'farming') return;
        global.hoeutils.debug.exp.stages.push('completed'); //1

        const skillText = skillTextField.get(renderListener).toString();
        const gained = Number(skillText.split("+")[1].split(" (")[0].replace(/,/g, ''));
        let xp
        if (skillText.match(/\((.+)\)/)) {
            xp = skillText.match(/\((.+)\)/)[1]
        } else xp = '-1/-1';
        global.hoeutils.debug.exp.xp = xp;
        global.hoeutils.debug.exp.skillText = skillText;
        const total = Number(xp.split("/")[0].replace(/,/g, ''));
        const current = Number(xp.split("/")[1].replace(/,/g, ''));

        getFarmingInfo(current, total, gained);
    })
}

register("tick", () => {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');

    let displayLines = [];

    global.hoeutils.display.clearLines();

    //updates
    updateColorSettings();
    updateUserSettings();
    updateScale();
    updateImageData();

    if (heldItem.getString('id').match(/HOE_CANE/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('cane')
    } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('potato', { replenish: 1 })
    } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('carrot', { replenish: 1 })
    } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('wheat')
    } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('wart', { farmingLevel: true, hourlyGain: true, replenish: 1 });
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
