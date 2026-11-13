"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Radio,
  List,
  Map as MapIcon,
} from "lucide-react";
import { cafes, cats } from "../data/seed";
import { safeExternalUrl, stories } from "../data/world";
import { useDemo } from "./DemoContext";
import { CatCard, Empty, Notice, Title } from "./ui";
export function CafeCards() {
  const { t } = useDemo();
  return (
    <div className="grid three cafe-cards">
      {cafes.map((cafe) => (
        <article className="cafe-card" key={cafe.id}>
          <Link href={"/cafes/" + cafe.id}>
            <img src={cafe.image} alt={cafe.name} loading="lazy" />
          </Link>
          <div className="card-body">
            <span className="eyebrow">
              {t("CONCEPT CAFÉ")} · {t(cafe.location)}
            </span>
            <h3>{cafe.name}</h3>
            <p>{t(cafe.description)}</p>
            <small className="block">
              <MapPin size={13} /> {t(cafe.address)}
            </small>
            <p className="cafe-residents">
              {t("Residents")}:{" "}
              {cats
                .filter((c) => c.cafeId === cafe.id)
                .map((c) => c.name)
                .join(" · ")}
            </p>
            <Link className="text-link" href={"/cafes/" + cafe.id}>
              {t("Explore café")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function CatWorld({ cafeId }: { cafeId?: string }) {
  const { t } = useDemo();
  const [view, setView] = useState<"map" | "list">("map"),
    [selected, setSelected] = useState(cafeId ?? cafes[0].id),
    [cafeFilter, setCafeFilter] = useState(cafeId ?? "all"),
    [location, setLocation] = useState("all"),
    [personality, setPersonality] = useState("all"),
    [age, setAge] = useState("all");
  const cafe = cafes.find((c) => c.id === (cafeId ?? selected))!,
    filtered = cats.filter(
      (c) =>
        (cafeFilter === "all" || c.cafeId === cafeFilter) &&
        (location === "all" ||
          cafes.find((f) => f.id === c.cafeId)?.location === location) &&
        (personality === "all" || c.id === personality) &&
        (age === "all" || (age === "young" ? c.age <= 2 : c.age > 2)),
    );
  return (
    <>
      <Title
        eyebrow={t("A LITTLE WORLD TO EXPLORE")}
        title={cafeId ? cafe.name : t("Come for a cat. Find a little world.")}
        description={
          cafeId
            ? t(cafe.description)
            : t(
                "Explore our illustrated café neighbourhood, then find the personalities who call it home.",
              )
        }
      />
      <Notice>
        {t(
          "Fictional map and concept cafés. Positions are illustrative, not real coordinates or directions. Addresses and partnerships are not verified.",
        )}
      </Notice>
      {cafeId ? (
        <div className="cafe-detail-banner">
          <img src={cafe.image} alt={cafe.name} />
          <div>
            <span className="eyebrow">{t("CONCEPT CAFÉ")}</span>
            <h2>{cafe.name}</h2>
            <p>{t(cafe.location)}</p>
            <p>
              <MapPin size={15} /> {t(cafe.address)}
            </p>
            {safeExternalUrl(cafe.mapUrl) && (
              <a
                className="text-link"
                href={safeExternalUrl(cafe.mapUrl)!}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Open verified map")}
                <ArrowUpRight size={16} />
              </a>
            )}
            <Link className="button secondary" href="/birthday">
              {t("Plan a birthday")}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="world-toolbar">
            <span className="eyebrow">{t("THE PAW NEIGHBOURHOOD")}</span>
            <div className="chips" aria-label={t("View options")}>
              <button
                className={view === "map" ? "selected" : ""}
                aria-pressed={view === "map"}
                onClick={() => setView("map")}
              >
                <MapIcon size={16} />
                {t("Map view")}
              </button>
              <button
                className={view === "list" ? "selected" : ""}
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <List size={16} />
                {t("List view")}
              </button>
            </div>
          </div>
          {view === "map" ? (
            <div className="world-map-layout">
              <div
                className="illustrated-map"
                role="group"
                aria-label={t("Illustrated café map")}
              >
                <svg viewBox="0 0 800 500" aria-hidden="true">
                  <path
                    className="map-land"
                    d="M80 220 400 40 730 220 410 430Z"
                  />
                  <path
                    className="map-park"
                    d="m390 70 150 83-100 63-151-85Z"
                  />
                  <path
                    className="map-water"
                    d="m130 290 280 155 320-183-32-22-291 164-242-138Z"
                  />
                  <path
                    className="map-road"
                    d="m150 237 260 143 251-144M410 380V188L230 89M410 188 570 95"
                  />
                  <g className="map-trees">
                    <circle cx="440" cy="126" r="18" />
                    <circle cx="477" cy="146" r="15" />
                    <circle cx="405" cy="147" r="13" />
                    <circle cx="294" cy="305" r="15" />
                    <circle cx="267" cy="287" r="12" />
                  </g>
                </svg>
                {cafes.map((c, i) => (
                  <button
                    aria-pressed={selected === c.id}
                    className={
                      "map-pin " + (selected === c.id ? "pin-selected" : "")
                    }
                    key={c.id}
                    style={{
                      left: c.mapPosition[0] + "%",
                      top: c.mapPosition[1] + "%",
                    }}
                    onClick={() => setSelected(c.id)}
                  >
                    <span className="map-house">{["☀", "✿", "☾"][i]}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
                <small className="map-legend">
                  {t("ILLUSTRATIVE MAP · NOT FOR NAVIGATION")}
                </small>
              </div>
              <article className="map-preview" aria-live="polite">
                <img src={cafe.image} alt={cafe.name} />
                <div>
                  <span className="eyebrow">{t("SELECTED CAFÉ")}</span>
                  <h3>{cafe.name}</h3>
                  <p>{t(cafe.description)}</p>
                  <small>{t(cafe.address)}</small>
                  <p>
                    {t("Residents")}:{" "}
                    {cats
                      .filter((c) => c.cafeId === cafe.id)
                      .map((c) => c.name)
                      .join(" · ")}
                  </p>
                  <Link className="button secondary" href={"/cafes/" + cafe.id}>
                    {t("Explore café")}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            </div>
          ) : (
            <CafeCards />
          )}
        </>
      )}
      <section className="resident-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("FIND A FAMILIAR FACE")}</span>
            <h2>{t("Meet the residents.")}</h2>
          </div>
          <span role="status">
            {filtered.length} {t("cats found")}
          </span>
        </div>
        <div className="world-filters">
          <label>
            {t("Cafés")}
            <select
              value={cafeFilter}
              onChange={(e) => setCafeFilter(e.target.value)}
              disabled={!!cafeId}
            >
              <option value="all">{t("All cafés")}</option>
              {cafes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Location")}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">{t("All locations")}</option>
              {cafes.map((c) => (
                <option key={c.id} value={c.location}>
                  {t(c.location)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Personality")}
            <select
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            >
              <option value="all">{t("All personalities")}</option>
              {cats.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.trait)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Age")}
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="all">{t("All ages")}</option>
              <option value="young">{t("1–2 years")}</option>
              <option value="older">{t("3+ years")}</option>
            </select>
          </label>
          <button
            className="text-link"
            onClick={() => {
              setCafeFilter(cafeId ?? "all");
              setLocation("all");
              setPersonality("all");
              setAge("all");
            }}
          >
            {t("Reset filters")}
          </button>
        </div>
        {filtered.length ? (
          <div className="grid three">
            {filtered.map((c) => (
              <CatCard cat={c} key={c.id} />
            ))}
          </div>
        ) : (
          <Empty text={t("No cats match these filters. Try a wider search.")} />
        )}
      </section>
    </>
  );
}
export function LiveCards({ compact = false }: { compact?: boolean }) {
  const { t } = useDemo();
  return (
    <div className={"grid " + (compact ? "two" : "three")}>
      {cafes.slice(0, compact ? 2 : 3).map((c) => {
        const url = safeExternalUrl(c.streamUrl);
        return (
          <article className="stream-card" key={c.id}>
            <div>
              <img src={c.image} alt={c.name} loading="lazy" />
              <span className="stream-status">
                <Radio size={14} />
                {t(url ? "External channel" : "Offline")}
              </span>
            </div>
            <div className="card-body">
              <h3>{c.name}</h3>
              <p>
                {t(
                  url
                    ? "Visit the approved external channel. Availability is controlled by the café."
                    : "No approved stream is available. In the meantime, meet the residents and read their stories.",
                )}
              </p>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {t("Open stream channel")}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <Link href={"/cafes/" + c.id} className="text-link">
                  {t("Meet the residents.")}
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
export function LivePage() {
  const { t } = useDemo();
  return (
    <>
      <Title
        eyebrow={t("LIVE CAT WORLD")}
        title={t("A window into their ordinary day.")}
        description={t(
          "External café channels, when available. No staged performances, guaranteed appearances or simulated live video.",
        )}
      />
      <LiveCards />
      <Notice>
        {t(
          "All sample cafés are currently offline. This demo does not host or broadcast video.",
        )}
      </Notice>
    </>
  );
}
export function StoriesPage({ storyId }: { storyId?: string }) {
  const { t } = useDemo();
  const story = stories.find((s) => s.id === storyId);
  if (story) {
    const cat = cats.find((c) => c.id === story.catId)!;
    return (
      <>
        <Link className="back" href="/stories">
          ← {t("Paw Journal")}
        </Link>
        <article className="journal-detail">
          <img src={cat.image} alt={cat.name} />
          <div>
            <span className="eyebrow">
              {t("FICTIONAL CAT STORY")} · {cat.name}
            </span>
            <h1>{t(story.title)}</h1>
            <p className="journal-deck">{t(story.caption)}</p>
            <h2>{t(story.chapter)}</h2>
            <p>{t(story.body)}</p>
            <Notice>
              {t(
                "An editorial sample, not a verified account of a real cat or café visit.",
              )}
            </Notice>
            <Link className="button" href={"/cats/" + cat.id}>
              {t("Open Cat ID")} · {cat.name}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      </>
    );
  }
  return (
    <>
      <Title
        eyebrow={t("PAW JOURNAL")}
        title={t("Ordinary days. Extraordinary little souls.")}
        description={t(
          "Fictional editorial chapters inspired by the personalities in our demo world.",
        )}
      />
      <div className="grid three">
        {stories.map((s) => {
          const cat = cats.find((c) => c.id === s.catId)!;
          return (
            <Link className="journal-card" href={"/stories/" + s.id} key={s.id}>
              <img src={cat.image} alt={cat.name} />
              <div className="card-body">
                <small>
                  {t("FICTIONAL CAT STORY")} · {cat.name}
                </small>
                <h2>{t(s.title)}</h2>
                <p>{t(s.caption)}</p>
                <span className="text-link">
                  {t("Read story")}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
