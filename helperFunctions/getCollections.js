import request from "requestV2/index";
import Promise from "PromiseV2/index";

const sendRequest = (url) => {
    const returnedPromise = request({
        url,
        headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)"
        }
    });
    return new Promise((resolve, reject) => {
        returnedPromise.then(value => resolve(JSON.parse(value)));
    });
}
export default function getCollections (firstLoad) {
    if (!global.hoeutils.data.key) {
        ChatLib.chat('&cPlease set your API key! Use &f/api new &ccommand to do so.');
        return;
    }
    let uuid = Player.getUUID()
    

    sendRequest("https://api.hypixel.net/player?key=" + global.hoeutils.data.key + "&uuid=" + uuid)
    .then(dataRequested => {
        if (dataRequested.player.stats.SkyBlock.profiles === undefined) {
            ChatLib.chat("&6[SBUtils] &cCouldn't find any Skyblock profiles for this player.");
            return;
        }


        const promises = Object.entries(dataRequested.player.stats.SkyBlock.profiles).map(([profile, value]) => {
            return sendRequest("https://api.hypixel.net/skyblock/profile?key=" + global.hoeutils.data.key + "&profile=" + profile);
        });

        Promise.all(promises).then(values => {
            var profiletimes = [];
            var profilekeys = [];
            let plainUUID = uuid.replace(/[^0-9a-f]/ig, '')
            values.map(result => {
                profilekeys.push(result.profile.members[plainUUID].last_save);
                profiletimes[result.profile.members[plainUUID].last_save] = result;
                profiletimes[result.profile.members[plainUUID].last_save].cute_name = dataRequested.player.stats.SkyBlock.profiles[result.profile.profile_id].cute_name;
            });

            var profile = profiletimes[Math.max.apply(null, profilekeys)].profile.members[plainUUID];
            
            const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
            const counter = heldItem.getInteger('mined_crops')
            if (heldItem.getString('id').match(/HOE_CANE/)) {
                if (global.hoeutils.collections.cane.API != profile.collection.SUGAR_CANE || firstLoad || global.collection.cane.counter == 0) {
                    global.hoeutils.collections.cane.counter = counter
                }
            } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
                if (global.hoeutils.collections.potato.API != profile.collection.POTATO_ITEM || firstLoad || global.collection.potato.counter == 0) {
                    global.hoeutils.collections.potato.counter = counter
                }
            } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
                if (global.hoeutils.collections.carrot.API != profile.collection.CARROT_ITEM || firstLoad || global.collection.carrot.counter == 0) {
                    global.hoeutils.collections.carrot.counter = counter
                }
            } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
                if (global.hoeutils.collections.wheat.API != profile.collection.WHEAT || firstLoad || global.collection.wheat.counter == 0) {
                    global.hoeutils.collections.wheat.counter = counter
                }
            } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
                if (global.hoeutils.collections.wart.API != profile.collection.NETHER_STALK || firstLoad || global.collection.wart.counter == 0) {
                    global.hoeutils.collections.wart.counter = counter
                }
            }
            global.hoeutils.collections.last_updated = profile.last_save
            global.hoeutils.collections.cane.API = profile.collection.SUGAR_CANE
            global.hoeutils.collections.potato.API = profile.collection.POTATO_ITEM
            global.hoeutils.collections.carrot.API = profile.collection.CARROT_ITEM
            global.hoeutils.collections.wheat.API = profile.collection.WHEAT
            global.hoeutils.collections.wart.API = profile.collection.NETHER_STALK
            global.hoeutils.collections.pumpkin = profile.collection.PUMPKIN
            global.hoeutils.collections.melon = profile.collection.MELON
            global.hoeutils.collections.cocoa = profile.collection['INK_SACK:3']
        }).catch(() => global.hoeutils.isCollectionError = 1200);
    }).catch(() => global.hoeutils.isCollectionError = 1200);
}