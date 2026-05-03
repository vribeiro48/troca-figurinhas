import { StickerProps } from '../App'

export interface StickerButtonProps {
  id: string;
  code: string;
  variant: "need" | "spare";
  bg?: boolean;
  onTradeSticker?: (sticker: StickerProps) => void
  onUnreceiveSticker?: (sticker: StickerProps) => void
  onUndeliverSticker?: (sticker: StickerProps) => void
}

export function Sticker({ id, code, variant, bg, onTradeSticker, onUnreceiveSticker, onUndeliverSticker }: StickerButtonProps) {
  let bgButtonVariant = "bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 hover:shadow-blue-800/50"

  if (variant == "spare") {
    bgButtonVariant = "bg-red-500 shadow-red-500/50 hover:bg-red-700 hover:shadow-red-800/50"
  }

  function handleTradeSticker() {
    if (onTradeSticker) {
      onTradeSticker({ id, code })
    }

    if (onUnreceiveSticker) {
      onUnreceiveSticker({ id, code })
    }

    if (onUndeliverSticker) {
      onUndeliverSticker({ id, code })
    }
  }
  return (
    <span>
      <button onClick={handleTradeSticker} className={`text-white font-bold w-24 text-xl py-2 px-4 rounded shadow-lg transition ${bgButtonVariant} ${bg ? "bg-yellow-400" : ""}`}>
        {code}
      </button>
    </span>
  )
}