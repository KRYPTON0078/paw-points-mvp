/** Editorial concepts only. No real visitors, partners or livestreams are represented. */
export const featureLinks = [
  {
    name: "CAT 101",
    copy: "A daily fan ritual. Three free votes, with personality at the heart of every season.",
    href: "/cat101",
    mark: "01",
  },
  {
    name: "Cat ID",
    copy: "A thoughtful passport for every cat, with stories, care transparency and a place to belong.",
    href: "/cats",
    mark: "02",
  },
  {
    name: "Paw Birthday",
    copy: "Make a little memory with cat-inspired celebrations, guided by café staff.",
    href: "/birthday",
    mark: "03",
  },
  {
    name: "Shop",
    copy: "Collect a little character. Discover keepsakes inspired by your favourite cat.",
    href: "/shop",
    mark: "04",
  },
  {
    name: "Companion",
    copy: "Build a lasting bond through thoughtful visits and staff-guided experiences.",
    href: "/companion",
    mark: "05",
  },
  {
    name: "Live Cat World",
    copy: "Discover café stream channels when an approved external stream becomes available.",
    href: "/live",
    mark: "06",
  },
];
export const stories = [
  {
    id: "sunbeam",
    catId: "mochi",
    title: "The art of doing very little.",
    caption:
      "A window, a blanket, a familiar face. Mochi reminds us that a connection can begin quietly.",
    chapter: "A quieter kind of hello",
    body: "In this fictional chapter, Mochi finds a favourite window seat. A patient visitor sits nearby, gives him space and lets him decide when to come closer.",
  },
  {
    id: "moonlight",
    catId: "luna",
    title: "An invitation, on her terms.",
    caption:
      "Luna takes her time. The best friendships leave room for a little independence.",
    chapter: "Space is part of friendship",
    body: "Our sample story follows Luna as she watches the reading corner before choosing her own place. Staff remind visitors that sharing a room can be enough.",
  },
  {
    id: "adventure",
    catId: "milo",
    title: "A whole world in a paper bag.",
    caption:
      "A small adventure, followed by a very serious nap. Welcome to Milo’s afternoon.",
    chapter: "Play, then pause",
    body: "In this illustrative story, a supervised enrichment session ends when Milo needs rest. His fans celebrate his ordinary day, without asking him to perform.",
  },
];
export const moments = [
  {
    catId: "mochi",
    caption: "The best seat in the house.",
    creator: "Demo editorial · 01",
  },
  {
    catId: "coco",
    caption: "Slow mornings are a kind of luxury.",
    creator: "Demo editorial · 02",
  },
  {
    catId: "nori",
    caption: "A new perspective on an ordinary day.",
    creator: "Demo editorial · 03",
  },
];
export const culture = [
  {
    title: "Personality comes first.",
    copy: "Each cat has a story, a routine and the freedom to choose their own company.",
  },
  {
    title: "Care shapes every experience.",
    copy: "Rest, consent and staff guidance matter more than a photo or a fan moment.",
  },
  {
    title: "Connection beyond a visit.",
    copy: "Stories and cat-inspired keepsakes can help cafés explore after-hours revenue without asking animals to perform.",
  },
];
export function safeExternalUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
