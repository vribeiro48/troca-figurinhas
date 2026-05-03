import { StickerProps } from "../App"

export default function SortSticker(arrayStickers: StickerProps[]) {
  const arrayStickersCodeNumber = arrayStickers.map((sticker: StickerProps) => {
    const newSticker = {
      id: sticker.id,
      code: sticker.code,
      codeOrder: parseInt(sticker.code.substring(3))
    }
  
    return newSticker
  })
  
  function compare(a: { codeOrder: number }, b: { codeOrder: number }) {
    if ( a.codeOrder < b.codeOrder ){
      return -1;
    }
    if ( a.codeOrder > b.codeOrder ){
      return 1;
    }
    return 0;
  }
  
  arrayStickersCodeNumber.sort(compare)
  
  const arrayStickersWithoutCodeOrder = arrayStickersCodeNumber.map((sticker) => {
    const newSticker = {
      id: sticker.id,
      code: sticker.code,
    }
  
    return newSticker
  })

  return arrayStickersWithoutCodeOrder
}