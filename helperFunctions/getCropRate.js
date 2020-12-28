import { rarities } from './constants';
export default function getCropRate() {
    let cropRate = 100;
    let debug = { values: { enchants: {} } }
    
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    
    //cropRate
    if (heldItem.getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)) {
        const hoeBonusValues = [ 10, 25, 50 ];
        let tier = heldItem.getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)[1];
        cropRate += hoeBonusValues[tier-1];
        debug.values.tierBonus = hoeBonusValues[tier-1];
    }
    else if (heldItem.getString('id').match(/COCO_CHOPPER/)) {
        cropRate += 20;
        debug.tierBonus = 20;
    }
    else if (heldItem.getString('id').match(/FUNGI_CUTTER/)) {
        cropRate += 30;
        debug.tierBonus = 30;
    }
    
    //cropRate
    const lore = JSON.parse(Player.getHeldItem().getRawNBT().match(/Lore:(\[.+\])/)[1].replace(/\d+:/g, ''));
    global.hoeutils.debug.lore = lore;
    let rarity;
    for (let i = 1; i <= 6; i++) {
        if (lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)) {
            rarity = lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)[1];
        }
    }
    debug.rarity = rarity;
    if (heldItem.getString('modifier') === 'blessed') cropRate += rarities[rarity];
    debug.values.rarity = rarities[rarity];
    
    //cropRate
    cropRate += global.hoeutils.farmingLevel * 4;
    debug.values.level = global.hoeutils.farmingLevel * 4;
    
    //cropRate
    let harvesting;
    if (heldItem.getCompoundTag('enchantments').getInteger('harvesting')) {
        harvesting = heldItem.getCompoundTag('enchantments').getInteger('harvesting') * 0.125
    }
    debug.values.enchants.harvesting = harvesting*100;
    
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_cane')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_cane') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_cane') * 5;
        }
    } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_potato')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_potato') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_potato') * 5;
        }
    } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot') * 5;
        }
    } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat') * 5;
        }
    } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_warts')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_warts') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_canturbo_wartse') * 5;
        }
    } else if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin') * 5;
        }
    } else if (heldItem.getString('id').match(/MELON_DICER/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_melon')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_melon') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_melon') * 5;
        }
    } else if (heldItem.getString('id').match(/COCOA_CHOPPER/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_coco')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_coco') * 5;
            debug.values.enchants.turbo = heldItem.getCompoundTag('enchantments').getInteger('turbo_coco') * 5;
        }
    }

    //cropRate
    if (heldItem.getString('id').match(/HOE_(CANE|POTATO|CARROT|WHEAT|WART)_[23]/)) {
        lore.forEach(str => {
            str = ChatLib.removeFormatting(str);
            if (str.match(/Counter bonus: \+(\d{1,3})%/i)) {
                cropRate += Number(str.match(/Counter bonus: \+(\d{1,3})%/i)[1]);
                debug.values.counter = Number(str.match(/Counter bonus: \+(\d{1,3})%/i)[1]);
            }
            if (str.match(/Collection bonus: \+(\d{1,3})%/i)) {
                cropRate += Number(str.match(/Collection bonus: \+(\d{1,3})%/i)[1]);
                debug.values.collection = Number(str.match(/Collection bonus: \+(\d{1,3})%/i)[1]);
            }
        });
    }
    
    let elephant = global.hoeutils.elephantPetLevel * 0.005;
    debug.values.elephant = elephant * 100;

    //cropRate
    cropRate += global.hoeutils.anitaBonus * 2
    debug.values.anita = global.hoeutils.anitaBonus * 2;
    
    global.hoeutils.debug.croprate = debug;

    return cropRate * (1 + elephant) * (1 + harvesting);
}