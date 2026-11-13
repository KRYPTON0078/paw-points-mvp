"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Mic, X } from "lucide-react";
import { demoAssistant, type AssistantReply } from "../lib/assistant";
import { useDemo } from "./DemoContext";
type SpeechSession = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult:
    | ((event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};
type SpeechConstructor = new () => SpeechSession;
export function PawGuide() {
  const { t, locale } = useDemo();
  const [open, setOpen] = useState(false),
    [question, setQuestion] = useState(""),
    [reply, setReply] = useState<AssistantReply | null>(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [listening, setListening] = useState(false),
    [supported, setSupported] = useState(false);
  const recognition = useRef<SpeechSession | null>(null),
    generation = useRef(0),
    panel = useRef<HTMLDivElement>(null),
    toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const host = window as unknown as {
      SpeechRecognition?: SpeechConstructor;
      webkitSpeechRecognition?: SpeechConstructor;
    };
    setSupported(!!(host.SpeechRecognition || host.webkitSpeechRecognition));
    return () => {
      recognition.current?.stop();
    };
  }, []);
  useEffect(() => {
    if (open) panel.current?.querySelector("input")?.focus();
  }, [open]);
  const ask = async (text: string) => {
    if (!text.trim()) return;
    const request = ++generation.current;
    setQuestion(text);
    setLoading(true);
    setError("");
    try {
      const answer = await demoAssistant.answer(text);
      if (request === generation.current) setReply(answer);
    } catch {
      setError("The guide could not answer. Please try again.");
    } finally {
      if (request === generation.current) setLoading(false);
    }
  };
  function voice() {
    const host = window as unknown as {
      SpeechRecognition?: SpeechConstructor;
      webkitSpeechRecognition?: SpeechConstructor;
    };
    const Constructor = host.SpeechRecognition || host.webkitSpeechRecognition;
    if (!Constructor) return;
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const session = new Constructor();
    session.lang =
      locale === "pt"
        ? "pt-PT"
        : locale === "en"
          ? "en-US"
          : locale === "zh-Hant"
            ? "zh-TW"
            : "zh-CN";
    session.interimResults = false;
    session.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript;
      if (text) void ask(text);
    };
    session.onerror = () => {
      setListening(false);
      setError(
        "Voice input is unavailable. You can type your question instead.",
      );
    };
    session.onend = () => setListening(false);
    recognition.current = session;
    try {
      session.start();
      setListening(true);
      setError("");
    } catch {
      setError(
        "Voice input is unavailable. You can type your question instead.",
      );
    }
  }
  const close = () => {
    recognition.current?.stop();
    setOpen(false);
    toggle.current?.focus();
  };
  return (
    <div className="paw-guide">
      {open && (
        <div
          className="guide-panel"
          ref={panel}
          role="region"
          aria-label={t("Paw Guide")}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <div className="between">
            <h3>{t("Paw Guide")}</h3>
            <button className="round" onClick={close} aria-label={t("Close")}>
              <X size={18} />
            </button>
          </div>
          <p>
            {t(
              "A demo content guide, not a live AI agent. No bookings, payments or account actions.",
            )}
          </p>
          <div className="guide-suggestions">
            {[
              "Find a calm cat",
              "Plan a birthday",
              "Nearby cafés",
              "How do points work?",
            ].map((q) => (
              <button key={q} onClick={() => void ask(t(q))}>
                {t(q)}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(question);
            }}
          >
            <label>
              <span className="sr-only">{t("Ask about this world")}</span>
              <input
                maxLength={300}
                placeholder={t("Ask about this world")}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <button
              className="button"
              disabled={loading || !question.trim()}
              type="submit"
            >
              {t("Ask")}
              <ArrowUpRight size={16} />
            </button>
          </form>
          {supported ? (
            <>
              <button
                className="text-link"
                onClick={voice}
                aria-pressed={listening}
              >
                <Mic size={16} />
                {t(listening ? "Stop listening" : "Use voice input")}
              </button>
              <small className="block">
                {t(
                  "Optional browser speech service. Nothing is recorded by Paw Points.",
                )}
              </small>
            </>
          ) : (
            <small>
              {t("Voice input is not supported here. Type to explore.")}
            </small>
          )}
          <div aria-live="polite" aria-busy={loading}>
            {loading ? (
              <p>{t("Looking through the demo world…")}</p>
            ) : (
              reply && (
                <article className="guide-reply">
                  <h4>{t(reply.title)}</h4>
                  <p>{t(reply.body)}</p>
                  {reply.links.map((l) => (
                    <Link
                      className="text-link"
                      href={l.href}
                      key={l.href}
                      onClick={close}
                    >
                      {t(l.label)}
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </article>
              )
            )}
          </div>
          {error && <p role="alert">{t(error)}</p>}
        </div>
      )}
      <button
        ref={toggle}
        className="guide-toggle"
        aria-expanded={open}
        aria-label={t("Paw Guide")}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <MessageCircle size={20} />
        <span>{t("Paw Guide")}</span>
      </button>
    </div>
  );
}
