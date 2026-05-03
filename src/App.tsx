import { useState, useEffect, ChangeEvent } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Sticker } from './components/Sticker'

import logo from './assets/logo.jpg'

import SortSticker from './helpers/SortStickers'

import './styles/main.css'

// const needStickers = [
//   "QAT1", "QAT2", "ECU2", "SEN3", "NED4", "ENG5", "IRN6", "USA7", "WAL8", "ARG9", "KSA10", "MEX11", "POL12", "FRA13", "AUS14", "DEN15", "TUN16", "ESP17", "CRC18", "BEL19", "JPN20", "GER21", "CAN22", "MAR23", "CRO24", "BRA25", "SRB26", "SUI27", "CMR28", "POR29", "GHA30", "URU31", "KOR32"
// ]

// const spareStickers = [
//   "QAT2", "BRA1", "ENG20", "CRC8", "ECU19", "ARG14", "GER2", "POL2"
// ]

export interface StickerProps {
  id: string;
  code: string;
}

function App() {

  const [animateStickersToGet] = useAutoAnimate<HTMLDivElement>()
  const [animateReceivingStickers] = useAutoAnimate<HTMLDivElement>()
  const [animateDeliveringStickers] = useAutoAnimate<HTMLDivElement>()
  const [animateStickersToTrade] = useAutoAnimate<HTMLDivElement>()

  const [stickersToGet, setStickersToGet] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem('stickersToGet') || '[]'))
  const [stickersToTrade, setStickersToTrade] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem('stickersToTrade') || '[]'))

  const [receivingStickers, setReceivingStickers] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem('receivingStickers') || '[]'))
  const [deliveringStickers, setDeliveringStickers] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem('deliveringStickers') || '[]'))

  const [searchStickersToGetText, setSearchStickersToGetText] = useState('')
  const [searchStickersToTradeText, setSearchStickersToTradeText] = useState('')

  const [createStickersToGetText, setCreateStickersToGetText] = useState('')
  const [createStickersToTradeText, setCreateStickersToTradeText] = useState('')

  useEffect(() => {
    localStorage.setItem('stickersToGet', JSON.stringify(stickersToGet));
  }, [stickersToGet])

  useEffect(() => {
    localStorage.setItem('stickersToTrade', JSON.stringify(stickersToTrade));
  }, [stickersToTrade])

  useEffect(() => {
    localStorage.setItem('receivingStickers', JSON.stringify(receivingStickers));
  }, [receivingStickers])

  useEffect(() => {
    localStorage.setItem('deliveringStickers', JSON.stringify(deliveringStickers));
  }, [deliveringStickers])

  const stickersToGetShown = searchStickersToGetText.length === 3
    ? SortSticker(stickersToGet.filter(sticker => sticker.code.includes(searchStickersToGetText)))
    : stickersToGet;

  const stickersToTradeShown = searchStickersToTradeText.length === 3
    ? SortSticker(stickersToTrade.filter(sticker => sticker.code.includes(searchStickersToTradeText)))
    : stickersToTrade;

  function receiveSticker(sticker: StickerProps) {
    if(!receivingStickers.find(stickerTofind => stickerTofind.code === sticker.code)){
      setReceivingStickers([ ...receivingStickers, sticker])
    }    
  }

  function deliverSticker(sticker: StickerProps) {
    if(!deliveringStickers.find(stickerTofind => stickerTofind.id === sticker.id)){
      setDeliveringStickers([ ...deliveringStickers, sticker])
    }    
  }

  function unreceiveSticker(stickerToUnreceive: StickerProps) {
    const receivingStickersWithoutPreviousOne = receivingStickers.filter(sticker => {
      return sticker.code !== stickerToUnreceive.code
    })

    setReceivingStickers(receivingStickersWithoutPreviousOne)
  }

  function undeliverSticker(stickerToUndeliver: StickerProps) {
    const deliveringStickersWithoutPreviousOne = deliveringStickers.filter(sticker => {
      return sticker.id !== stickerToUndeliver.id
    })

    setDeliveringStickers(deliveringStickersWithoutPreviousOne)
  }

  function handleTradeStickers() {
    const stickersToGetAfterTrade = stickersToGet.filter(sticker => {
      return !receivingStickers.find(stickerTofind => stickerTofind.id === sticker.id)
    })

    const spareStickersAfterTrade = stickersToTrade.filter(sticker => {
      return !deliveringStickers.find(stickerTofind => stickerTofind.id === sticker.id)
    })

    setStickersToGet(stickersToGetAfterTrade)
    setStickersToTrade(spareStickersAfterTrade)

    setReceivingStickers([])
    setDeliveringStickers([])
  }

  function handleSearchStickersToGetTextChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchStickersToGetText(event.target.value.toUpperCase())
  }

  function handleSearchStickersToTradeTextChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchStickersToTradeText(event.target.value.toUpperCase())
  }

  function handleCreateStickerToGetTextChange(event: ChangeEvent<HTMLInputElement>) {
    setCreateStickersToGetText(event.target.value.toUpperCase())
  }

  function handleCreateStickerToTradeTextChange(event: ChangeEvent<HTMLInputElement>) {
    setCreateStickersToTradeText(event.target.value.toUpperCase())
  }

  function handleCreateStickerToGet() {
    if (createStickersToGetText.length > 3) {
      const sticker: StickerProps = {
        id: Math.random().toString(),
        code: createStickersToGetText
      }

      setStickersToGet([...stickersToGet, sticker])
      setCreateStickersToGetText(createStickersToGetText.substring(0,3))
    }
  }

  function handleCreateStickerToTrade() {
    if (createStickersToTradeText.length > 3) {
      
      const sticker: StickerProps = {
        id: Math.random().toString(),
        code: createStickersToTradeText
      }

      setStickersToTrade([...stickersToTrade, sticker])
      setCreateStickersToTradeText(createStickersToTradeText.substring(0,3))
    }
    
  }

  let bgDark: boolean

  return (
    <div className="max-w-[1400px] mx-auto text-center my-20 px-3">
      <div className="flex align-center justify-between">
        <span className="w-32 p-5 hidden sm:block"></span>
        <h1 className="text-white mx-auto font-bold uppercase m-6 text-2xl">Troca de Figurinhas</h1>
        <img src={logo} className="w-32 p-5 mt-[-1rem] hidden sm:block" alt="" />
      </div>
      
      <div className="grid lg:grid-cols-3 gap-3">
        {/* Preciso */}
        <div className="bg-blue-900 min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <h2>Preciso: {stickersToGet.length}</h2>
            </div>
            <div className="flex gap-2">
              <input type="text" onChange={handleCreateStickerToGetTextChange} onKeyDown={(e) => e.key === 'Enter' && handleCreateStickerToGet()} value={createStickersToGetText} className="w-20 p-2 rounded bg-blue-700 outline-none focus:outline-white text-white font-bold uppercase" maxLength={5} placeholder="Inserir" />
              <button onClick={handleCreateStickerToGet} className="text-white font-bold text-xl py-2 px-4 rounded shadow-lg transition bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 hover:shadow-blue-800/50">+</button>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <input type="text" onChange={handleSearchStickersToGetTextChange} className="w-full p-2 rounded bg-blue-700 outline-none focus:outline-white text-white font-bold uppercase" placeholder="Busca: QAT, BRA, NED, ..." maxLength={3} />
          </div>
          <div className="flex gap-2 flex-wrap mt-4" ref={animateStickersToGet}>
            {stickersToGetShown.map((sticker) => {
              bgDark = false
              if(receivingStickers.find(stickerTofind => stickerTofind.id === sticker.id)){
                bgDark = true
              }
              return <Sticker key={sticker.id} id={sticker.id} code={sticker.code} variant="need" bg={bgDark} onTradeSticker={receiveSticker} />
            })}

            {stickersToGetShown.length < 1 ? <span className="text-white">Comece adicionando figurinhas que você precisa</span> : ""}
          </div>
        </div>

        {/* Troca */}
        <div className="bg-green-800 min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <h2>Troca</h2>
          <div className="min-h-24 mt-4">
            {receivingStickers.length > 0 ? <h2>Recebendo: {receivingStickers.length}</h2> : "" }
            <div className="flex gap-2 flex-wrap flex-grow mt-4" ref={animateReceivingStickers}>
              {receivingStickers.map((receivingSticker) => {
                return <Sticker key={receivingSticker.id} id={receivingSticker.id} code={receivingSticker.code} variant="need" onUnreceiveSticker={unreceiveSticker} />
              })}
            </div>
          </div>
          <div className="min-h-24 mt-14">
            {deliveringStickers.length > 0 ? <h2>Entregando: {deliveringStickers.length}</h2> : "" }
            <div className="flex gap-2 flex-wrap mt-4" ref={animateDeliveringStickers}>
              {deliveringStickers.map((deliveringSticker) => {
                return <Sticker key={deliveringSticker.id} id={deliveringSticker.id} code={deliveringSticker.code} variant="spare" onUndeliverSticker={undeliverSticker} />
              })}
            </div>
          </div>
          <div className="mt-12">
          {receivingStickers.length > 0 || deliveringStickers.length > 0 ? <button className="bg-green-600 buttonTrade py-2 px-4 text-white font-bold rounded shadow-lg shadow-green-600/50 hover:shadow-green-500/50 hover:bg-green-500 transition" onClick={handleTradeStickers}>TROCAR</button> : ""}
          </div>
        </div>

        {/* Repetidas */}
        <div className="bg-worldcup26Dark min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <h2>Repetidas: {stickersToTrade.length}</h2>
            </div>
            <div className="flex gap-2">
              <input type="text" onChange={handleCreateStickerToTradeTextChange} onKeyDown={(e) => e.key === 'Enter' && handleCreateStickerToTrade()} value={createStickersToTradeText} className="w-20 p-2 rounded bg-red-700 outline-none focus:outline-white text-white font-bold uppercase" maxLength={5} placeholder="Inserir" />
              <button onClick={handleCreateStickerToTrade} className="text-white font-bold text-xl py-2 px-4 rounded shadow-lg transition bg-red-800 shadow-red-800/50 hover:bg-red-600 hover:shadow-red-700/50">+</button>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <input type="text" onChange={handleSearchStickersToTradeTextChange} className="w-full p-2 rounded bg-red-700 outline-none focus:outline-white text-white font-bold uppercase" placeholder="Busca: QAT, BRA, NED, ..." maxLength={3} />
          </div>
          <div className="flex gap-2 flex-wrap mt-4" ref={animateStickersToTrade}>
            {stickersToTradeShown.map((sticker) => {
              bgDark = false
              if(deliveringStickers.find(stickerTofind => stickerTofind.id === sticker.id)){
                bgDark = true
              }
              return <Sticker key={sticker.id} id={sticker.id} code={sticker.code} variant="spare" bg={bgDark} onTradeSticker={deliverSticker} />
            })}

            {stickersToTradeShown.length < 1 ? <span className="text-white">Comece adicionando figurinhas que você quer trocar</span> : ""}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
