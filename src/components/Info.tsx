"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { culture } from "../data/world";
import { infoPages } from "../data/info";
import { useDemo } from "./DemoContext";
import { Title } from "./ui";
export function InfoPage({ page }: { page: string }) {
  const { t } = useDemo();
  const info = infoPages[page];
  return (
    <>
      <Title eyebrow={t(info.eyebrow)} title={t(info.title)} />
      <div className="info-prose">
        {info.paragraphs.map((p) => (
          <p key={p}>{t(p)}</p>
        ))}
        <Link className="button" href="/cats">
          {t("Explore the Cat World")}
          <ArrowUpRight size={17} />
        </Link>
      </div>
      {page === "about" && (
        <section className="grid three">
          {culture.map((c) => (
            <article className="panel" key={c.title}>
              <h3>{t(c.title)}</h3>
              <p>{t(c.copy)}</p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
