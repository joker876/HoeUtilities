export function hoeLock(action, pos, event) {
    const heldItem = Player.getHeldItem().getName()
    if (Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes").getString("id").includes("3")) return;
    if (global.hoeutils.userSettings.isHoeLockEnabled) {
        if (
            ChatLib.removeFormatting(heldItem).includes("Turing") ||
            ChatLib.removeFormatting(heldItem).includes("Pythagorean") ||
            ChatLib.removeFormatting(heldItem).includes("Gauss") ||
            ChatLib.removeFormatting(heldItem).includes("Newton") ||
            ChatLib.removeFormatting(heldItem).includes("Euclid")
        ) {
            cancel(event);
            World.playSound('note.bass', 1000, 0)
            hoeLockMessage();
        }
    }
}
let hoeLockMessageStatus = 0
function hoeLockMessage() {
    hoeLockMessageStatus++;
    if (hoeLockMessageStatus == 1) {
        ChatLib.chat('&a[HoeUtilities] &cA feature has stopped you from opening this menu.')
    }
    setTimeout(() => {
        hoeLockMessageStatus = 0
    }, 30000);
}
