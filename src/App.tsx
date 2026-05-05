import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Sticker } from "./components/Sticker";

import qrcode from "./assets/qrcode-pix.jpg";

import SortSticker from "./helpers/SortStickers";

import "./styles/main.css";

export interface StickerProps {
  id: string;
  code: string;
}

function App() {
  const [animateStickersToGet] = useAutoAnimate<HTMLDivElement>();
  const [animateReceivingStickers] = useAutoAnimate<HTMLDivElement>();
  const [animateDeliveringStickers] = useAutoAnimate<HTMLDivElement>();
  const [animateStickersToTrade] = useAutoAnimate<HTMLDivElement>();

  const [stickersToGet, setStickersToGet] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem("stickersToGet") || "[]"),
  );
  const [stickersToTrade, setStickersToTrade] = useState<StickerProps[]>(() =>
    JSON.parse(localStorage.getItem("stickersToTrade") || "[]"),
  );

  const [receivingStickers, setReceivingStickers] = useState<StickerProps[]>(
    () => JSON.parse(localStorage.getItem("receivingStickers") || "[]"),
  );
  const [deliveringStickers, setDeliveringStickers] = useState<StickerProps[]>(
    () => JSON.parse(localStorage.getItem("deliveringStickers") || "[]"),
  );

  const [searchStickersToGetText, setSearchStickersToGetText] = useState("");
  const [searchStickersToTradeText, setSearchStickersToTradeText] =
    useState("");

  const [createStickersToGetText, setCreateStickersToGetText] = useState("");
  const [createStickersToTradeText, setCreateStickersToTradeText] =
    useState("");

  const [showThanks, setShowThanks] = useState(false);
  const thanksRef = useRef<HTMLDivElement>(null);

  function scrollToThanks() {
    thanksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (showThanks) {
      scrollToThanks();
    }
  }, [showThanks]);

  useEffect(() => {
    localStorage.setItem("stickersToGet", JSON.stringify(stickersToGet));
  }, [stickersToGet]);

  useEffect(() => {
    localStorage.setItem("stickersToTrade", JSON.stringify(stickersToTrade));
  }, [stickersToTrade]);

  useEffect(() => {
    localStorage.setItem(
      "receivingStickers",
      JSON.stringify(receivingStickers),
    );
  }, [receivingStickers]);

  useEffect(() => {
    localStorage.setItem(
      "deliveringStickers",
      JSON.stringify(deliveringStickers),
    );
  }, [deliveringStickers]);

  const stickersToGetShown =
    searchStickersToGetText.length === 3
      ? SortSticker(
          stickersToGet.filter((sticker) =>
            sticker.code.includes(searchStickersToGetText),
          ),
        )
      : stickersToGet;

  const stickersToTradeShown =
    searchStickersToTradeText.length === 3
      ? SortSticker(
          stickersToTrade.filter((sticker) =>
            sticker.code.includes(searchStickersToTradeText),
          ),
        )
      : stickersToTrade;

  function receiveSticker(sticker: StickerProps) {
    if (!receivingStickers.some((s) => s.id === sticker.id)) {
      setReceivingStickers([...receivingStickers, sticker]);
    }
  }

  function deliverSticker(sticker: StickerProps) {
    if (!deliveringStickers.some((s) => s.id === sticker.id)) {
      setDeliveringStickers([...deliveringStickers, sticker]);
    }
  }

  function unreceiveSticker(stickerToUnreceive: StickerProps) {
    setReceivingStickers(
      receivingStickers.filter((s) => s.id !== stickerToUnreceive.id),
    );
  }

  function undeliverSticker(stickerToUndeliver: StickerProps) {
    setDeliveringStickers(
      deliveringStickers.filter((s) => s.id !== stickerToUndeliver.id),
    );
  }

  function handleTradeStickers() {
    const receivingIds = new Set(receivingStickers.map((s) => s.id));
    const deliveringIds = new Set(deliveringStickers.map((s) => s.id));

    setStickersToGet(stickersToGet.filter((s) => !receivingIds.has(s.id)));
    setStickersToTrade(stickersToTrade.filter((s) => !deliveringIds.has(s.id)));

    setReceivingStickers([]);
    setDeliveringStickers([]);
  }

  function handleSearchStickersToGetTextChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSearchStickersToGetText(event.target.value.toUpperCase());
  }

  function handleSearchStickersToTradeTextChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSearchStickersToTradeText(event.target.value.toUpperCase());
  }

  function handleCreateStickerToGetTextChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setCreateStickersToGetText(event.target.value.toUpperCase());
  }

  function handleCreateStickerToTradeTextChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setCreateStickersToTradeText(event.target.value.toUpperCase());
  }

  function handleCreateStickerToGet() {
    if (createStickersToGetText.length > 3) {
      const sticker: StickerProps = {
        id: crypto.randomUUID(),
        code: createStickersToGetText,
      };

      setStickersToGet([...stickersToGet, sticker]);
      setCreateStickersToGetText(createStickersToGetText.substring(0, 3));
    }
  }

  function handleCreateStickerToTrade() {
    if (createStickersToTradeText.length > 3) {
      const sticker: StickerProps = {
        id: crypto.randomUUID(),
        code: createStickersToTradeText,
      };

      setStickersToTrade([...stickersToTrade, sticker]);
      setCreateStickersToTradeText(createStickersToTradeText.substring(0, 3));
    }
  }

  const receivingIds = new Set(receivingStickers.map((s) => s.id));
  const deliveringIds = new Set(deliveringStickers.map((s) => s.id));

  return (
    <div className="max-w-[1500px] mx-auto text-center pt-12 pb-8 px-6 sm:px-3 min-h-screen flex flex-col">
      <h1 className="text-white font-bold uppercase my-2 mx-6 sm:m-6 text-2xl">
        Trocador de Figurinhas - Álbum Panini Copa 2026
      </h1>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-3 mt-12 mb-16">
        {/* Preciso */}
        <div className="bg-blue-900 min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <h2>Preciso: {stickersToGet.length}</h2>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                onChange={handleCreateStickerToGetTextChange}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCreateStickerToGet()
                }
                value={createStickersToGetText}
                className="w-20 p-2 rounded bg-blue-700 outline-none focus:outline-white text-white font-bold uppercase"
                maxLength={5}
                placeholder="Inserir"
              />
              <button
                onClick={handleCreateStickerToGet}
                className="text-white font-bold text-xl py-2 px-4 rounded shadow-lg transition bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 hover:shadow-blue-800/50"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <input
              type="text"
              onChange={handleSearchStickersToGetTextChange}
              className="w-full p-2 rounded bg-blue-700 outline-none focus:outline-white text-white font-bold uppercase"
              placeholder="Busca: QAT, BRA, NED, ..."
              maxLength={3}
            />
          </div>
          <div className="flex gap-2 flex-wrap mt-4" ref={animateStickersToGet}>
            {stickersToGetShown.map((sticker) => (
              <Sticker
                key={sticker.id}
                id={sticker.id}
                code={sticker.code}
                variant="need"
                bg={receivingIds.has(sticker.id)}
                onTradeSticker={receiveSticker}
              />
            ))}

            {stickersToGetShown.length < 1 && (
              <span className="text-white">
                Comece adicionando figurinhas que você precisa
              </span>
            )}
          </div>
        </div>

        {/* Troca */}
        <div className="bg-green-800 min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <h2>Troca</h2>
          <div className="min-h-24 mt-4">
            {receivingStickers.length > 0 && (
              <h2>Recebendo: {receivingStickers.length}</h2>
            )}
            <div
              className="flex gap-2 flex-wrap flex-grow mt-4"
              ref={animateReceivingStickers}
            >
              {receivingStickers.map((receivingSticker) => {
                return (
                  <Sticker
                    key={receivingSticker.id}
                    id={receivingSticker.id}
                    code={receivingSticker.code}
                    variant="need"
                    onUnreceiveSticker={unreceiveSticker}
                  />
                );
              })}
            </div>
          </div>
          <div className="min-h-24 mt-14">
            {deliveringStickers.length > 0 && (
              <h2>Entregando: {deliveringStickers.length}</h2>
            )}
            <div
              className="flex gap-2 flex-wrap mt-4"
              ref={animateDeliveringStickers}
            >
              {deliveringStickers.map((deliveringSticker) => {
                return (
                  <Sticker
                    key={deliveringSticker.id}
                    id={deliveringSticker.id}
                    code={deliveringSticker.code}
                    variant="spare"
                    onUndeliverSticker={undeliverSticker}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-12">
            {(receivingStickers.length > 0 || deliveringStickers.length > 0) && (
              <button
                className="bg-slate-100 buttonTrade py-2 px-4 text-green-800 font-bold rounded shadow-lg shadow-slate-100/50 hover:bg-white hover:shadow-white/50 transition inline-flex items-center gap-2"
                onClick={handleTradeStickers}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
                TROCAR
              </button>
            )}
          </div>
        </div>

        {/* Repetidas */}
        <div className="bg-worldcup26Dark min-h-96 rounded-md py-8 px-6 shadow-md shadow-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <h2>Repetidas: {stickersToTrade.length}</h2>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                onChange={handleCreateStickerToTradeTextChange}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCreateStickerToTrade()
                }
                value={createStickersToTradeText}
                className="w-20 p-2 rounded bg-red-700 outline-none focus:outline-white text-white font-bold uppercase"
                maxLength={5}
                placeholder="Inserir"
              />
              <button
                onClick={handleCreateStickerToTrade}
                className="text-white font-bold text-xl py-2 px-4 rounded shadow-lg transition bg-red-800 shadow-red-800/50 hover:bg-red-600 hover:shadow-red-700/50"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <input
              type="text"
              onChange={handleSearchStickersToTradeTextChange}
              className="w-full p-2 rounded bg-red-700 outline-none focus:outline-white text-white font-bold uppercase"
              placeholder="Busca: QAT, BRA, NED, ..."
              maxLength={3}
            />
          </div>
          <div
            className="flex gap-2 flex-wrap mt-4"
            ref={animateStickersToTrade}
          >
            {stickersToTradeShown.map((sticker) => (
              <Sticker
                key={sticker.id}
                id={sticker.id}
                code={sticker.code}
                variant="spare"
                bg={deliveringIds.has(sticker.id)}
                onTradeSticker={deliverSticker}
              />
            ))}

            {stickersToTradeShown.length < 1 && (
              <span className="text-white">
                Comece adicionando figurinhas que você quer trocar
              </span>
            )}
          </div>
        </div>
      </div>

      {showThanks && (
        <div ref={thanksRef} className="fade-in">
          <p className="text-white text-center mt-12">
            Este software economizou seu tempo ao trocar figurinhas?
            <br />
            Fique à vontade para agradecer com um café (ou ignorar totalmente
            essa mensagem)
          </p>
          <div className="flex justify-center mt-4">
            <img
              src={qrcode}
              onLoad={scrollToThanks}
              className="w-[60%] sm:w-[35%] lg:w-[13%]"
              alt=""
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  "00020101021126330014br.gov.bcb.pix0111129243597675204000053039865802BR5922VINICIUS R DE OLIVEIRA6007NITEROI62070503***6304FC39",
                )
              }
              className="bg-green-600 py-2 px-4 text-white font-bold rounded shadow-lg shadow-green-600/50 hover:shadow-green-500/50 hover:bg-green-500 transition"
            >
              Copiar QR Code PIX
            </button>
          </div>
          <div className="mb-12" />
        </div>
      )}
      <hr className="mt-auto w-full border-t border-slate-600" />
      <footer className="text-white text-center mt-6 text-sm">
        Desenvolvido por Vinicius Ribeiro de Oliveira{" "}
        <a
          href="https://www.linkedin.com/in/viniciusribeirodeoliveira/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          (LinkedIn)
        </a>
        <div className="mt-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowThanks((v) => !v);
            }}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Agradecer
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
