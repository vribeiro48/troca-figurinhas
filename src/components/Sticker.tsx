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
  const variantClasses = variant === "spare"
    ? "bg-red-500 shadow-red-500/50 hover:bg-red-700 hover:shadow-red-800/50"
    : "bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 hover:shadow-blue-800/50"

  const bgClasses = bg
    ? "bg-yellow-400 shadow-yellow-400/50"
    : variantClasses

  function handleTradeSticker() {
    onTradeSticker?.({ id, code })
    onUnreceiveSticker?.({ id, code })
    onUndeliverSticker?.({ id, code })
  }

  return (
    <button
      onClick={handleTradeSticker}
      className={`text-white font-bold w-24 text-xl py-2 px-4 rounded shadow-lg transition ${bgClasses}`}
    >
      {code}
    </button>
  )
}
