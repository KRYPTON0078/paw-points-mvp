import test from "node:test";
import assert from "node:assert/strict";
import { products, cafes, cats } from "../src/data/seed";
import { categories, emptyFilters, filterProducts } from "../src/lib/catalog";
import { assistantIntent, demoAssistant } from "../src/lib/assistant";
import { stories, safeExternalUrl } from "../src/data/world";
import { act, initial, remainingVotes } from "../src/lib/engine";
import type { DemoState } from "../src/lib/models";
import { qrTarget } from "../src/lib/qr-entry";
test("shop combines category, color, inclusive price, type and availability; resetting restores all products", () => {
  const filters = {
    ...emptyFilters,
    category: "Limited editions",
    color: "Blue",
    min: "48",
    max: "48",
    type: "Digital",
    availability: "Demo available",
  };
  assert.deepEqual(
    filterProducts(products, filters).map((p) => p.id),
    ["nori-member"],
  );
  assert.deepEqual(filterProducts(products, { ...filters, color: "Sage" }), []);
  assert.deepEqual(filterProducts(products, { ...filters, min: "49" }), []);
  assert.equal(
    filterProducts(products, { ...emptyFilters }).length,
    products.length,
  );
  assert.equal(
    filterProducts(products, {
      ...emptyFilters,
      category: "Fashion accessories",
    })[0].availability,
    "Coming soon",
  );
  assert.ok(
    categories.every((category) =>
      products.some((p) => p.category === category),
    ),
  );
});
test("unavailable concepts cannot enter a cart or be checked out from restored storage", () => {
  const state = initial();
  assert.throws(
    () =>
      act(
        state,
        { type: "cart", productId: "nori-charm", quantity: 1 },
        "coming-soon",
      ),
    /not available/,
  );
  assert.equal(
    act(
      { ...state, cart: { "nori-charm": 1 } },
      { type: "cart", productId: "nori-charm", quantity: 0 },
      "remove",
    ).cart["nori-charm"],
    0,
  );
  assert.throws(
    () =>
      act(
        { ...state, cart: { "nori-charm": 1 } },
        { type: "checkout" },
        "blocked-checkout",
      ),
    /not available/,
  );
  assert.equal(state.points, 0);
  assert.equal(state.orders.length, 0);
});
test("2.0 saved histories and cart retain their values through the 2.1 catalog", () => {
  const now = new Date("2026-11-13T04:00:00Z");
  let old = act(
    initial(),
    { type: "follow", catId: "mochi" },
    "old-follow",
    now,
  );
  old = act(old, { type: "checkin", catId: "mochi" }, "old-checkin", now);
  old = act(
    old,
    { type: "cart", productId: "mochi-cards", quantity: 2 },
    "old-cart",
    now,
  );
  old = act(old, { type: "vote", catId: "luna" }, "old-vote", now);
  old = act(
    old,
    {
      type: "book",
      packageId: "mini",
      date: "2026-11-14",
      guests: 2,
      cafeId: "paw-macau",
      theme: "Peach garden",
    },
    "old-book",
    now,
  );
  const storage = JSON.stringify({ state: { data: old }, version: 2 });
  const restored: DemoState = JSON.parse(storage).state.data;
  const result = act(restored, { type: "checkout" }, "new-order", now);
  assert.equal(result.orders[0].amount, 116);
  assert.equal(result.points, old.points + 116);
  for (const field of [
    "cats",
    "votes",
    "bookings",
    "visits",
    "bondLedger",
    "primary",
    "badges",
  ] as const)
    assert.deepEqual(result[field], old[field], field);
  assert.equal(remainingVotes(result, now), 2);
  assert.equal(old.cart["mochi-cards"], 2);
  assert.deepEqual(result.pointsLedger.slice(1), old.pointsLedger);
});
test("world content resolves to existing cats and cafés; external links are HTTPS only", () => {
  assert.ok(cats.every((c) => cafes.some((f) => f.id === c.cafeId)));
  assert.ok(stories.every((s) => cats.some((c) => c.id === s.catId)));
  assert.ok(
    cafes.every((c) => c.streamUrl === null && c.sample && !c.coordinates),
  );
  assert.equal(safeExternalUrl("javascript:alert(1)"), null);
  assert.equal(safeExternalUrl("http://example.org"), null);
  assert.equal(safeExternalUrl("https://user:pass@example.org"), null);
  assert.equal(
    safeExternalUrl("https://example.org/channel"),
    "https://example.org/channel",
  );
});
test("guide handles four-language suggestions, explicit cat names and unknown questions without actions", async () => {
  for (const q of ["Nearby cafés", "附近猫咖", "附近貓咖", "Cafés próximos"])
    assert.equal(assistantIntent(q), "nearby");
  for (const q of [
    "Plan a birthday",
    "生日计划",
    "生日計劃",
    "Planear aniversário",
  ])
    assert.equal(assistantIntent(q), "birthday");
  for (const q of [
    "How do points work?",
    "积分规则",
    "積分規則",
    "Como funcionam os pontos?",
  ])
    assert.equal(assistantIntent(q), "points");
  for (const q of [
    "Find a calm cat",
    "安静的猫",
    "安靜的貓",
    "Encontrar um gato tranquilo",
  ])
    assert.equal(assistantIntent(q), "discover");
  const reply = await demoAssistant.answer("Tell me about Nori");
  assert.equal(reply.title, "Nori");
  assert.equal(reply.links[0].href, "/cats/nori");
  assert.match(
    (await demoAssistant.answer("nearby")).body,
    /no verified coordinates/,
  );
  assert.equal(
    (await demoAssistant.answer("make a real payment")).links[0].href,
    "/cats",
  );
});
test("QR targets use public HTTPS production default outside GitHub Pages", () => {
  const site = process.env.NEXT_PUBLIC_SITE_URL,
    base = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    assert.equal(
      qrTarget("cafe", "pawbrew"),
      "https://paw-points-mvp.vercel.app/enter/?cafe=pawbrew",
    );
  } finally {
    if (site === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = site;
    if (base === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = base;
  }
});
