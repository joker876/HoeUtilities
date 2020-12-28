import { dataFileStructure, collections } from './helperFunctions/constants'

let data = JSON.parse(FileLib.read('HoeUtilities', './data.json'));
if (!data) {
    FileLib.write('HoeUtilities', './data.json', JSON.stringify(dataFileStructure));
    data = JSON.parse(FileLib.read('HoeUtilities', './data.json'));
}
global.hoeutils = { data, debug: { exp: {} } };
global.hoeutils.loadTimestamp = Date.now()

global.hoeutils.metadata = JSON.parse(FileLib.read('HoeUtilities', './metadata.json'));

global.hoeutils.gui = new Gui();
global.hoeutils.display = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));
global.hoeutils.timerDisplay = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));
global.hoeutils.farmingDisplay = new Display()
    .setShouldRender(false)
    .setBackground('full')
    .setBackgroundColor(Renderer.color(0, 0, 0, 0));

global.hoeutils.collections = collections;

import { initiateGuiMover, guiMover } from './helperFunctions/guiMover';
import { getElephantLevel } from './helperFunctions/getElephantLevel';
import   initiateSettings from './helperFunctions/settings';
import { hoeLock } from './helperFunctions/hoeLock';
initiateGuiMover();
register('renderOverlay', guiMover);

register('tick', getElephantLevel);

initiateSettings();

register('playerInteract', hoeLock);

import { apiKeyGrabber, apiKeyChatCriteria } from './helperFunctions/apiKeyGrabber';
import   anitaBonusGrabber from './helperFunctions/anitaBonusGrabber';
import { commandHandler } from './helperFunctions/commandHandler';
import { updateColorSettings, updateUserSettings, updateImageData, updateScale, countActiveModules } from './helperFunctions/tickUpdates';
import { produceAllLines, produceFarmingLines } from './helperFunctions/smallFunctions';
import   getAPIInfo from './helperFunctions/getAPI';
import { standardImages, timerImage } from './helperFunctions/renderOverlays';
import   getFarmingInfo from './helperFunctions/getFarmingInfo';
import { startSession, endSession } from './helperFunctions/session.js';

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

getAPIInfo('collection', true);
getAPIInfo('farming', true)
register('step', () => getAPIInfo('collection')).setDelay(240);
register('step', () => getAPIInfo('farming')).setDelay(60);
register('worldLoad', () => { getAPIInfo('collection'); getAPIInfo('farming') })

//images
register('renderOverlay', standardImages);
register('renderOverlay', timerImage);

register('step', () => {
    if (!global.hoeutils.stopData) FileLib.write('HoeUtilities', './data.json', JSON.stringify(global.hoeutils.data));
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    const counter = heldItem.getInteger('mined_crops');
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
//export { skillTextField, skillField, renderListener };

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

global.hoeutils.currentFarmingExpLeft = Infinity;
global.hoeutils.isFarmingTimer = 0;
global.hoeutils.wasSessionStarted = false;
register('tick', () => {
    if (!global.hoeutils.settings.getSetting('Features', 'Sessions (WIP)')) return;
    if (global.hoeutils.currentFarmingExpLeft == Infinity || global.hoeutils.currentFarmingExpLeft == undefined) global.hoeutils.currentFarmingExpLeft = global.hoeutils.expToNext;
    if (global.hoeutils.currentFarmingExpLeft > global.hoeutils.expToNext) {
        global.hoeutils.farmingExpDebug = { current: global.hoeutils.currentFarmingExpLeft, toNext: global.hoeutils.expToNext };
        global.hoeutils.currentFarmingExpLeft = global.hoeutils.expToNext;
        if (global.hoeutils.isFarming == 0) global.hoeutils.isFarming = 1;
        if (global.hoeutils.isFarming == 1 && !global.hoeutils.wasSessionStarted) {
            global.hoeutils.wasSessionStarted = true;
            startSession();
            global.hoeutils.isFarming = 2;
        }
        if (global.hoeutils.isFarming) {
            global.hoeutils.isFarmingTimer = 0;
        }
    }
    else global.hoeutils.isFarming = 0;
    if (!global.hoeutils.isFarming) {
        global.hoeutils.isFarmingTimer++;
    }
    if (global.hoeutils.isFarmingTimer == global.hoeutils.settings.getSetting('Sessions', 'Auto-end after &8in seconds')*20) {
        endSession();
        global.hoeutils.wasSessionStarted = false;
    }
})
register('worldUnload', () => {
    if (global.hoeutils.settings.getSetting('Features', 'Sessions (WIP)')) return;
    if (global.hoeutils.wasSessionStarted) endSession();
})

register("tick", () => {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');

    let displayLines = [];
    let farmingDisplayLines = [];

    global.hoeutils.display.clearLines();
    global.hoeutils.farmingDisplay.clearLines();

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
        displayLines = produceAllLines('wart', { replenish: 1 });
    }
    else if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('pumpkin', { counter: true});
    }
    else if (heldItem.getString('id').match(/MELON_DICER/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('melon', { counter: true });
    }
    else if (heldItem.getString('id').match(/COCO_CHOPPER/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('cocoa', { counter: true, replenish: 1 });
    }
    else if (heldItem.getString('id').match(/CACTUS_KNIFE/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('cactus', { counter: true });
    }
    else if (heldItem.getString('id').match(/FUNGI_CUTTER/)) {
        global.hoeutils.display.setShouldRender(true)
        displayLines = produceAllLines('mushroom', { counter: true });
    } else global.hoeutils.display.setShouldRender(false)
    
    if (heldItem.getString('id').match(/HOE_(CANE|POTATO|CARROT|WHEAT)|DICER|COCO_CHOPPER|CACTUS_KNIFE|FUNGI_CUTTER/)) {
        let timerCrop
        if (heldItem.getString('id').match(/HOE_CANE/)) timerCrop = 'cane';
        else if (heldItem.getString('id').match(/HOE_POTATO/))  timerCrop = 'potato';
        else if (heldItem.getString('id').match(/HOE_CARROT/))  timerCrop = 'carrot';
        else if (heldItem.getString('id').match(/HOE_WHEAT/))  timerCrop = 'wheat';
        else if (heldItem.getString('id').match(/PUMPKIN_DICER/))  timerCrop = 'pumpkin';
        else if (heldItem.getString('id').match(/MELON_DICER/))  timerCrop = 'melon';
        else if (heldItem.getString('id').match(/COCO_CHOPPER/))  timerCrop = 'cocoa';
        else if (heldItem.getString('id').match(/CACTUS_KNIFE/))  timerCrop = 'cactus';
        else if (heldItem.getString('id').match(/FUNGI_CUTTER/))  timerCrop = 'mushroom';
        global.hoeutils.farmingDisplay.setShouldRender(true)
        farmingDisplayLines = produceFarmingLines(timerCrop)
    } else global.hoeutils.farmingDisplay.setShouldRender(false)
    if (!global.hoeutils.settings.getSetting('Features', 'Farming Info')) {
        global.hoeutils.farmingDisplay.setShouldRender(false);
    } 

    displayLines.forEach((line, i) => {
        global.hoeutils.display.setLine(i, line.setShadow(true).setScale(global.hoeutils.scale))
    })
    farmingDisplayLines.forEach((line, i) => {
        global.hoeutils.farmingDisplay.setLine(i, line.setShadow(true).setScale(global.hoeutils.farmingScale))
    })
})
