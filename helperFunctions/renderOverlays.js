import {
    imageCane,
    imagePotato,
    imageCarrot,
    imageWheat,
    imageWart,
    imageEvent
} from './constants';
export function standardImages() {
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
    }
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    const activeModuleCount = countActiveModules()
    if (!activeModuleCount) return;
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
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    try {
        if (heldItem.getString('id').match(/HOE_CANE/)) {
            imageCane.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
        } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
            imagePotato.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
        } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
            imageCarrot.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
        } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
            imageWheat.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size - 2, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
        } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
            imageWart.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
        }
    } catch (error) {
        updateImageData();
    }
}
export function timerImage() {
    if (!global.hoeutils.userSettings.isEventTimerEnabled) return;
    if (!Scoreboard.getTitle().replace(/§./g, '').equals('SKYBLOCK') && !global.hoeutils.userSettings.isEventTimerEnabledEverywhere) return;
    if (global.hoeutils.userSettings.isEventImageEnabled) {
        imageEvent.draw(global.hoeutils.data.timer.x - global.hoeutils.eventImageData.size - 4, global.hoeutils.data.timer.y + global.hoeutils.eventImageData.yOffset, global.hoeutils.eventImageData.size, global.hoeutils.eventImageData.size)
    }
}