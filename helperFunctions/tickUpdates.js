import { colors } from './constants';
import { makeTimer } from '../helperFunctions/smallFunctions';
const settings = global.hoeutils.settings

global.hoeutils.colorSettings = {
    main: colors[settings.getSetting('Colors', 'Main')],
    numbers: colors[settings.getSetting('Colors', 'Numbers')],
    timer: colors[settings.getSetting('Colors', 'Timer')],
    potato: colors[settings.getSetting('Colors', 'Potato')],
    cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
    carrot: colors[settings.getSetting('Colors', 'Carrot')],
    wart: colors[settings.getSetting('Colors', 'Nether Wart')],
    wheat: colors[settings.getSetting('Colors', 'Wheat')],
    /* pumpkin: colors[settings.getSetting('Colors', 'Pumpkin')],
    melon: colors[settings.getSetting('Colors', 'Melon')],
    cocoa: colors[settings.getSetting('Colors', 'Cocoa')], */
}
export function updateColorSettings() {
    global.hoeutils.colorSettings = {
        main: colors[settings.getSetting('Colors', 'Main')],
        numbers: colors[settings.getSetting('Colors', 'Numbers')],
        timer: colors[settings.getSetting('Colors', 'Timer')],
        potato: colors[settings.getSetting('Colors', 'Potato')],
        cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
        carrot: colors[settings.getSetting('Colors', 'Carrot')],
        wart: colors[settings.getSetting('Colors', 'Nether Wart')],
        wheat: colors[settings.getSetting('Colors', 'Wheat')],
        /* pumpkin: colors[settings.getSetting('Colors', 'Pumpkin')],
        melon: colors[settings.getSetting('Colors', 'Melon')],
        cocoa: colors[settings.getSetting('Colors', 'Cocoa')], */
    }
}
export function updateUserSettings() {
    global.hoeutils.userSettings = {
        isCounterEnabled: settings.getSetting('Features', 'Counter'),
        isCropRateEnabled: settings.getSetting('Features', 'Crop Rate'),
        isMaxEfficiencyEnabled: settings.getSetting('Features', 'Hourly Drops'),
        isHourlyXpGainEnabled: settings.getSetting('Features', 'Hourly max_exp'),
        isFarmingLevelEnabled: settings.getSetting('Features', 'Farming Level'),
        isCollectionEnabled: settings.getSetting('Features', 'Collection'),
        isHoeLockEnabled: settings.getSetting('Features', 'Hoe Lock'),
        isEventReminderEnabled: settings.getSetting('Features', 'Event Reminder'),
        isEventTimerEnabled: settings.getSetting('Features', 'Event Timer'),
        isEventTimerEnabledEverywhere: settings.getSetting('Timer', 'Enable everywhere'),
        isImageEnabled: settings.getSetting('Settings', 'Enable images'),
        isEventImageEnabled: settings.getSetting('Timer', 'Enable image')
    }
}
export function updateScale() {
    global.hoeutils.scale = settings.getSetting('Settings', 'Scale &8in %') / 100
}
export function updateImageData() {
    //event
    if (!global.hoeutils.userSettings.isEventTimerEnabled) return;
    if (!Scoreboard.getTitle().replace(/§./g, '').equals('SKYBLOCK') && !global.hoeutils.userSettings.isEventTimerEnabledEverywhere) {
        global.hoeutils.timerDisplay.setShouldRender(false)
        return
    }
    global.hoeutils.eventImageData = {
        size: 14 * global.hoeutils.scale,
        yOffset: -4 * global.hoeutils.scale
    }
    const sampleTimestamp = 1606691700
    const timestamp = Math.floor(Date.now() / 1000)
    const secondsRemaining = 3600 + (sampleTimestamp - timestamp) % 3600
    const settingsNum = Number(settings.getSetting('Timer', 'Remind how long before the event starts? &8in seconds'))

    if (secondsRemaining == settingsNum && !global.hoeutils.wasEventReminderDisplayed) {
        global.hoeutils.wasEventReminderDisplayed = true;
        new Message(`&a[HoeUtilities] &e&nJacob\'s Farming Contest&r&e is starting in &c${settingsNum} seconds&e!`).chat();
        World.playSound('mob.villager.idle', 1000, 1);
        setTimeout(() => {
            global.hoeutils.wasEventReminderDisplayed = false;
        }, 1100);
    }
    if (secondsRemaining >= 2400) global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`&aNOW`).setShadow(true))
    else global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`${global.hoeutils.colorSettings.timer}${makeTimer(secondsRemaining)}`).setShadow(true))
    global.hoeutils.timerDisplay.setShouldRender(true)

    //main
    function countActiveModules() {
        const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
        let count = 0
        if (global.hoeutils.userSettings.isCropRateEnabled) count++;
        if (global.hoeutils.userSettings.isCounterEnabled && !heldItem.getString('id').match(/PUMPKIN|MELON|COCOA/)) count++;
        if (global.hoeutils.userSettings.isMaxEfficiencyEnabled) count++;
        if (global.hoeutils.userSettings.isFarmingLevelEnabled && !heldItem.getString('id').match(/HOE_WARTS/)) count++;
        if (global.hoeutils.userSettings.isCollectionEnabled && !heldItem.getString('id').match(/HOE_WARTS/)) count++;
        if (global.hoeutils.userSettings.isHourlyXpGainEnabled) count++;
        return count;
    }
    global.hoeutils.imageData = {
        enabled: false,
        size: 0,
        yOffset: 0,
        type: null,
    }
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    const activeModuleCount = countActiveModules()
    if (!activeModuleCount) return;
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (heldItem.getString('id').match(/HOE_CANE/)) global.hoeutils.imageData.type = 'cane';
    else if (heldItem.getString('id').match(/HOE_POTATO/)) global.hoeutils.imageData.type = 'potato';
    else if (heldItem.getString('id').match(/HOE_CARROT/)) global.hoeutils.imageData.type = 'carrot';
    else if (heldItem.getString('id').match(/HOE_WHEAT/)) global.hoeutils.imageData.type = 'wheat';
    else if (heldItem.getString('id').match(/HOE_WARTS/)) global.hoeutils.imageData.type = 'wart';
    else return;
    switch (activeModuleCount) {
        case 1:
            global.hoeutils.imageData.size = 14 * global.hoeutils.scale;
            break;
        default:
            global.hoeutils.imageData.size = 20 * global.hoeutils.scale;
            break;
    }
    switch (activeModuleCount) {
        case 1:
            global.hoeutils.imageData.yOffset = -3 * global.hoeutils.scale;
            break;
        case 2:
            global.hoeutils.imageData.yOffset = -2 * global.hoeutils.scale;
            break;
        case 3:
            global.hoeutils.imageData.yOffset = 3 * global.hoeutils.scale;
            break;
        case 4:
            global.hoeutils.imageData.yOffset = 9 * global.hoeutils.scale;
            break;
        case 5:
            global.hoeutils.imageData.yOffset = 15 * global.hoeutils.scale;
            break;
        case 6:
            global.hoeutils.imageData.yOffset = 21 * global.hoeutils.scale;
            break;
    }
}
