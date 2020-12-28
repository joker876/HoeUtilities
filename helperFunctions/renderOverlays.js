import {
    imageCane,
    imagePotato,
    imageCarrot,
    imageWheat,
    imageWart,
    imageEvent,
    imagePumpkin,
    imageMelon,
    imageCocoa,
    imageCactus,
    imageMushroom,
} from './constants';
import { countActiveModules } from './tickUpdates';
countActiveModules()
export function standardImages() {
    //main
    global.hoeutils.imageData = {
        scale: 0,
        yOffset: 0,
    }
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    
    if (!global.hoeutils.activeModuleCount) return;

    global.hoeutils.imageData.yOffset = -4 + 6 * (global.hoeutils.activeModuleCount - 1);
    global.hoeutils.imageData.scale = 1.1 * global.hoeutils.scale;
    global.hoeutils.imageData.size = 16 * global.hoeutils.scale;

    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    try {
        if (heldItem.getString('id').match(/HOE_CANE/)) {
            imageCane.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
            imagePotato.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
            imageCarrot.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
            imageWheat.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
            imageWart.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
            imagePumpkin.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/MELON_DICER/)) {
            imageMelon.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/COCO_CHOPPER/)) {
            imageCocoa.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/CACTUS_KNIFE/)) {
            imageCactus.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        } else if (heldItem.getString('id').match(/FUNGI_CUTTER/)) {
            imageMushroom.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y + global.hoeutils.imageData.yOffset, global.hoeutils.imageData.scale);
        }
    } catch (error) {
        updateImageData();
    }
}
export function timerImage() {
    if (!global.hoeutils.userSettings.isEventTimerEnabled) return;
    if (!Scoreboard.getTitle().replace(/§./g, '').equals('SKYBLOCK') && !global.hoeutils.userSettings.isEventTimerEnabledEverywhere) return;
    if (global.hoeutils.userSettings.isEventImageEnabled) {
        imageEvent.draw(global.hoeutils.data.timer.x - global.hoeutils.eventImageData.size - 4, global.hoeutils.data.timer.y + global.hoeutils.eventImageData.yOffset, global.hoeutils.eventImageData.scale)
    }
}