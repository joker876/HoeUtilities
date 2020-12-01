import { rarities } from './constants';
export default function getCropRate() {
    const itemNBT = Player.getHeldItem().getItemNBT();
    let crop_rate = 100;

    if (itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)) {
        const hoeBonusValues = [ 10, 25, 50 ];
        let tier = itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)[1];
        crop_rate += hoeBonusValues[tier-1];
    }

    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');

    const lore = JSON.parse(Player.getHeldItem().getRawNBT().match(/Lore:(\[.+\])/)[1].replace(/\d+:/g, ''));
    let rarity;
    if (heldItem.getString('id').match(/HOE/)) {
        for (let i = 1; i <= 6; i++) {
            if (lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)) {
                rarity = lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)[1];
            }
        }
    }
    if (itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('modifier') === 'blessed') crop_rate += rarities[rarity];
    
    crop_rate += global.hoeutils.farmingLevel * 4;

    if (heldItem.getCompoundTag('enchantments').getInteger('harvesting')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('harvesting') * 12.5;

    if (heldItem.getString('id').match(/HOE_CANE/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_cane')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_cane') * 5;
    } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_potato')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_potato') * 5;
    } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot') * 5;
    } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat') * 5;
    } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_warts')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_warts') * 5;
    } else if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        crop_rate += 64*0.114 + 160*0.043 + 10*160*0.007 + 64*160*0.001;
        if (heldItem.getCompoundTag('enchantments').getInteger('turbu_pumpkin')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin') * 5;
    } else if (heldItem.getString('id').match(/MELON_DICER/)) {
        crop_rate += 160*0.114 + 5*160*0.043 + 50*160*0.007 + 2*160*160*0.001;
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_melon')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_melon') * 5;
    } else if (heldItem.getString('id').match(/COCOA_CHOPPER/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_coco')) crop_rate += heldItem.getCompoundTag('enchantments').getInteger('turbo_coco') * 5;
    }
    if (heldItem.getString('id').match(/HOE/)) {
        lore.forEach(str => {
            str = ChatLib.removeFormatting(str);
            if (str.match(/Counter bonus: \+(\d{1,3})%/i)) crop_rate += Number(str.match(/Counter bonus: \+(\d{1,3})%/i)[1]);
        });
    }

    crop_rate += global.hoeutils.elephantPetLevel * 0.5;

    return crop_rate;
}