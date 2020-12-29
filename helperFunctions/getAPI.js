import   request from "requestV2/index";
import   Promise from "PromiseV2/index";
import { skillCurves } from './constants';
//import { makeTimer } from './smallFunctions'

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
export default function getAPIInfo (type, firstLoad) {
    global.hoeutils.debug.getCollectionsStages = {};
    if (!global.hoeutils.data.key) return;
    let uuid = Player.getUUID()
    global.hoeutils.debug.getCollectionsStages.uuid = uuid;
    global.hoeutils.debug.getCollectionsStages.key = global.hoeutils.data.key;
    

    sendRequest("https://api.hypixel.net/player?key=" + global.hoeutils.data.key + "&uuid=" + uuid)
    .then(dataRequested => {
        if (dataRequested.player.stats.SkyBlock.profiles === undefined) {
            ChatLib.chat("&6[SBUtils] &cCouldn't find any Skyblock profiles for this player.");
            return;
        }
        global.hoeutils.debug.getCollectionsStages.stage1 = 'completed';


        const promises = Object.entries(dataRequested.player.stats.SkyBlock.profiles).map(([profile, value]) => {
            return sendRequest("https://api.hypixel.net/skyblock/profile?key=" + global.hoeutils.data.key + "&profile=" + profile);
        });
        global.hoeutils.debug.getCollectionsStages.stage2 = 'completed';

        Promise.all(promises).then(values => {
            var profiletimes = [];
            var profilekeys = [];
            let plainUUID = uuid.replace(/[^0-9a-f]/ig, '')
            values.map(result => {
                profilekeys.push(result.profile.members[plainUUID].last_save);
                profiletimes[result.profile.members[plainUUID].last_save] = result;
                profiletimes[result.profile.members[plainUUID].last_save].cute_name = dataRequested.player.stats.SkyBlock.profiles[result.profile.profile_id].cute_name;
            });

            const profile = profiletimes[Math.max.apply(null, profilekeys)].profile.members[plainUUID];
            if (type == 'collection') {
                const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
                const counter = heldItem.getInteger('mined_crops')
                if (heldItem.getString('id').match(/HOE_CANE/)) {
                    if (global.hoeutils.collections.cane.API != profile.collection.SUGAR_CANE || firstLoad || global.hoeutils.collections.cane.counter == 0) {
                        global.hoeutils.collections.cane.counter = counter
                    }
                } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
                    if (global.hoeutils.collections.potato.API != profile.collection.POTATO_ITEM || firstLoad || global.hoeutils.collections.potato.counter == 0) {
                        global.hoeutils.collections.potato.counter = counter
                    }
                } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
                    if (global.hoeutils.collections.carrot.API != profile.collection.CARROT_ITEM || firstLoad || global.hoeutils.collections.carrot.counter == 0) {
                        global.hoeutils.collections.carrot.counter = counter
                    }
                } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
                    if (global.hoeutils.collections.wheat.API != profile.collection.WHEAT || firstLoad || global.hoeutils.collections.wheat.counter == 0) {
                        global.hoeutils.collections.wheat.counter = counter
                    }
                } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
                    if (global.hoeutils.collections.wart.API != profile.collection.NETHER_STALK || firstLoad || global.hoeutils.collections.wart.counter == 0) {
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
                global.hoeutils.collections.mushroom = profile.collection.MUSHROOM_COLLECTION
                global.hoeutils.collections.cactus = profile.collection.CACTUS
            }
            else if (type == 'farming') {
                const farmingExp = profile.experience_skill_farming;
                let farmingLevel = 0;
                skillCurves.forEach(exp => {
                    if (exp <= farmingExp) farmingLevel++;
                })
                global.hoeutils.farmingLevel = farmingLevel;
                if (profile.jacob2.perks) {
                    global.hoeutils.levelCap = 50+(profile.jacob2.perks.farming_level_cap || 0);
                    global.hoeutils.anitaBonus = profile.jacob2.perks.double_drops || 0;
                }
                global.hoeutils.medals = profile.jacob2.medals_inv || null;
            }
        }).catch(() => global.hoeutils.isCollectionError = 1200);
    }).catch(() => global.hoeutils.isCollectionError = 1200);
}

export function getFarmingLevelFromAPI() {
}