"use client";
import Link from "next/link";
import { ArrowUpRight, Heart, PawPrint, Sparkles } from "lucide-react";
import { cats, cafes } from "../data/seed";
import { culture, featureLinks, moments, stories } from "../data/world";
import { useDemo } from "./DemoContext";
import { CatCard, SectionHead } from "./ui";
import { CafeCards, LiveCards } from "./World";
export function BrandHome() {
  const { t } = useDemo();
  return (
    <>
      <section className="editorial-hero">
        <div className="editorial-copy">
          <span className="eyebrow">
            <PawPrint size={15} />
            {t("A LITTLE WORLD. A LASTING CONNECTION.")}
          </span>
          <h1>
            {t("Every Cat Has a Story.")}
            <br />
            <em>{t("Every Fan Makes It Grow.")}</em>
          </h1>
          <p>
            {t(
              "Discover real cats, explore their stories, join their communities, and create meaningful connections beyond the café.",
            )}
          </p>
          <div className="actions">
            <Link className="button" href="/cats">
              {t("Explore the Cat World")}
              <ArrowUpRight size={17} />
            </Link>
            <Link className="button secondary" href="/cat101">
              {t("Discover CAT 101")}
            </Link>
          </div>
          <small>
            {t(
              "An illustrative world with fictional cats and cafés. Explore freely; your progress stays in this browser.",
            )}
          </small>
          <div className="editorial-signature">
            <span>♡</span>
            {t("Good company. On their terms.")}
          </div>
        </div>
        <div className="editorial-image">
          <img src={cats[0].image} alt="Mochi" fetchPriority="high" />
          <div className="image-index">
            01 / 05 <span>{t("THE RESIDENT SUNSHINE")}</span>
          </div>
          <div className="image-caption">
            <span>
              <small>{t("A SMALL INTRODUCTION")}</small>
              <strong>Mochi</strong>
              <span>{t(cats[0].trait)}</span>
            </span>
            <Link
              className="round"
              href="/cats/mochi"
              aria-label={t("Open Cat ID")}
            >
              <ArrowUpRight />
            </Link>
          </div>
          <div className="hero-mini">
            <img src={cats[1].image} alt="Luna" />
            <span>
              Luna<small>{t("A little independent.")}</small>
            </span>
            <Heart size={16} />
          </div>
        </div>
      </section>
      <section className="culture-strip">
        <div>
          <span className="eyebrow">
            PAW POINTS · {t("OUR LITTLE PHILOSOPHY")}
          </span>
          <h2>
            {t("More than a moment.")}
            <br />
            <em>{t("A world to come back to.")}</em>
          </h2>
        </div>
        <p>
          {t(
            "We imagine a world where a café visit is the beginning of a friendship. Real animal welfare, individual personalities and responsible communities guide the product we are building.",
          )}
        </p>
        <Link
          href="/about"
          className="round"
          aria-label={t("About Paw Points")}
        >
          <ArrowUpRight />
        </Link>
      </section>
      <section>
        <SectionHead
          label={t("THE CHARACTERS BEHIND THE PAWS")}
          title={t("Find your kind of little soul.")}
          href="/cats"
          link={t("Meet everyone")}
        />
        <div className="grid three">
          {cats.slice(0, 3).map((c) => (
            <CatCard key={c.id} cat={c} />
          ))}
        </div>
      </section>
      <section className="feature-world">
        <SectionHead
          label={t("ONE WORLD. MANY WAYS TO BELONG.")}
          title={t("Follow your curiosity.")}
        />
        <div className="feature-grid">
          {featureLinks.map((f) => (
            <Link href={f.href} key={f.name} className="world-feature">
              <span className="feature-index">
                {f.mark}
                <ArrowUpRight size={19} />
              </span>
              <h3>{t(f.name)}</h3>
              <p>{t(f.copy)}</p>
              <span className="text-link">
                {t("Explore")} <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <SectionHead
          label={t("THE COMMUNITY EDIT")}
          title={t("Little moments. Big feelings.")}
          href="/cats"
          link={t("Find a familiar face")}
        />
        <p className="section-intro">
          {t(
            "Sample editorial gallery. Illustrative cat photography, not visitor submissions or verified café moments.",
          )}
        </p>
        <div className="moments-grid">
          {moments.map((m) => {
            const cat = cats.find((c) => c.id === m.catId)!;
            return (
              <Link
                href={"/cats/" + cat.id}
                key={cat.id}
                className="moment-card"
              >
                <div>
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <span className="pill">{t("SAMPLE EDITORIAL")}</span>
                </div>
                <small>
                  {cat.name} · {cafes.find((c) => c.id === cat.cafeId)?.name}
                </small>
                <h3>{t(m.caption)}</h3>
                <span className="moment-credit">{t(m.creator)}</span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="story-edit">
        <SectionHead
          label={t("FROM THE PAW JOURNAL")}
          title={t("Every personality, a new chapter.")}
          href="/stories"
          link={t("Read the stories")}
        />
        <div className="grid three">
          {stories.map((story) => {
            const cat = cats.find((c) => c.id === story.catId)!;
            return (
              <Link
                href={"/stories/" + story.id}
                className="story-card"
                key={story.id}
              >
                <small>
                  {t("FICTIONAL CAT STORY")} · {cat.name}
                </small>
                <h3>{t(story.title)}</h3>
                <p>{t(story.caption)}</p>
                <span className="text-link">
                  {t("Read story")}
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <SectionHead
          label={t("MEET THE PLACES BEHIND THE PAWS")}
          title={t("A little closer to their world.")}
          href="/cafes"
          link={t("Explore café map")}
        />
        <CafeCards />
      </section>
      <section className="partner-panel">
        <Sparkles size={25} />
        <div>
          <span className="eyebrow">{t("A SHARED VISION")}</span>
          <h2>{t("Room for good company.")}</h2>
          <p>
            {t(
              "Partner showcase preview. No confirmed café or brand partnerships are represented. Future collaborators can help shape a more thoughtful cat community.",
            )}
          </p>
          <Link className="text-link" href="/contact">
            {t("Explore a collaboration")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <span className="partner-placeholder">
          {t("Your brand here")}
          <small>{t("Opportunity preview")}</small>
        </span>
      </section>
      <section>
        <SectionHead
          label={t("A WINDOW INTO THEIR DAY")}
          title={t("Their world, at their own pace.")}
          href="/live"
          link={t("Live Cat World")}
        />
        <LiveCards compact />
      </section>
      <section className="care-manifesto">
        <span className="eyebrow">
          {t("A PROMISE THAT SHAPES THE PRODUCT")}
        </span>
        <h2>{t("Small paws. Thoughtful choices.")}</h2>
        <div className="grid three">
          {culture.map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.copy)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
