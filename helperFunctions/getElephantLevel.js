global.hoeutils.elephantPetLevel = 0;
global.hoeutils.entityNames = [];
export function getElephantLevel() {
    let playerName = Player.getName();
    World.getAllEntities().forEach(pet => {
        pet = pet.getName();
        if (ChatLib.removeFormatting(pet).match(new RegExp(`\\[Lv([0-9]{1,3})\\].+ ${playerName}'s Elephant`))) {
            if (pet.match(new RegExp(`6${playerName}'s Elephant`))) {
                global.hoeutils.elephantPetLevel = Number(ChatLib.removeFormatting(pet).match(/Lv(\d{1,3})/)[1]);
            }
        }
    })
}