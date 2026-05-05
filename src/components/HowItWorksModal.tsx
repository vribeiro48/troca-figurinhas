import { useEffect } from "react";

interface Step {
  title: string;
  description: string;
  image?: string;
}

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

const steps: Step[] = [
  {
    title: "1. Comece pelo álbum",
    description:
      "Abra seu álbum, cole as figurinhas iniciais que vêm com ele e separe as que sobraram. A partir daí você já consegue saber o que precisa e o que tem para trocar.",
  },
  {
    title: "2. Preencha a coluna \"Preciso\"",
    description:
      "Na coluna azul, digite o código de cada figurinha que ainda falta no seu álbum (ex.: BRA01, ARG12) e clique no botão + (ou aperte Enter). Faça isso para tudo que você precisa para terminar a coleção.",
    image: "/guide/guide-preciso.png",
  },
  {
    title: "3. Preencha a coluna \"Repetidas\"",
    description:
      "Na coluna vermelha, faça o mesmo com as figurinhas que vieram repetidas. Esse é o seu bolo de troca: tudo que você está disposto a entregar.",
    image: "/guide/guide-repetidas.png",
  },
  {
    title: "4. Vá a um centro de troca",
    description:
      "Encontre outro colecionador. Olhe o bolo de figurinhas repetidas dele e veja se alguma aparece na sua coluna \"Preciso\". Se sim, clique nessas figurinhas — elas ficam destacadas em amarelo e aparecem em \"Recebendo\" no meio da tela.",
    image: "/guide/guide-recebendo.png",
  },
  {
    title: "5. Marque o que você vai entregar",
    description:
      "Na sua coluna \"Repetidas\", clique nas figurinhas que o outro colecionador está levando. Elas vão aparecer em \"Entregando\". Confirme que os dois lados estão equilibrados.",
    image: "/guide/guide-entregando.png",
  },
  {
    title: "6. Clique em TROCAR",
    description:
      "Depois que tudo estiver marcado, clique no botão TROCAR. As figurinhas recebidas saem de \"Preciso\" e as entregues saem de \"Repetidas\" automaticamente. Pronto, é só repetir o processo na próxima troca!",
    image: "/guide/guide-trocar.gif",
  },
];

export function HowItWorksModal({ open, onClose }: HowItWorksModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-worldcup26 border border-slate-600 rounded-lg shadow-2xl max-w-3xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-white text-2xl leading-none w-8 h-8 rounded hover:bg-white/10 transition"
        >
          ×
        </button>

        <div className="px-8 py-10">
          <h2 className="text-white font-bold text-2xl uppercase mb-2 text-center">
            Como funciona?
          </h2>
          <p className="text-slate-300 text-center mb-8">
            Um guia rápido para usar o trocador de figurinhas.
          </p>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <section key={step.title}>
                <h3 className="text-white font-bold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-200 leading-relaxed mb-3">
                  {step.description}
                </p>
                {step.image && (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full rounded border border-slate-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                )}
              </section>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-lg shadow-blue-500/50 transition"
            >
              Entendi!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
