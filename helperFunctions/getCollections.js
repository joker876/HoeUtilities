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
export function getCollections (firstLoad) {
    global.hoeutils.debug.getCollectionsStages = {};
    if (!global.hoeutils.data.key) {
        ChatLib.chat('&cPlease set your API key! Use &f/api new &ccommand to do so.');
        return;
    }
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

            return profiletimes[Math.max.apply(null, profilekeys)].profile.members[plainUUID];
        }).catch(() => global.hoeutils.isCollectionError = 1200);
    }).catch(() => global.hoeutils.isCollectionError = 1200);
}