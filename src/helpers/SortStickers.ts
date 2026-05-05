import { StickerProps } from "../App"

export default function SortSticker(stickers: StickerProps[]) {
  return [...stickers].sort(
    (a, b) => parseInt(a.code.substring(3), 10) - parseInt(b.code.substring(3), 10)
  )
}
