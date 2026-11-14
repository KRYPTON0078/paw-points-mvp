import { cafes, cats } from "../data/seed";
export type AssistantIntent =
  | "discover"
  | "nearby"
  | "birthday"
  | "points"
  | "unknown";
export interface AssistantReply {
  title: string;
  body: string;
  links: { href: string; label: string }[];
}
/** Future adapters can implement this interface. No remote calls, credentials or user data. */
export interface AssistantAdapter {
  answer(text: string): Promise<AssistantReply>;
}
export function assistantIntent(text: string): AssistantIntent {
  if (/\bnear(?:by)?\b|附近|perto|próxim|位置|地圖|地图|localiza/i.test(text))
    return "nearby";
  if (/birthday|生日|aniversário|aniversario/i.test(text)) return "birthday";
  if (/point|积分|積分|ponto|xp|规则|規則|regra|vote|投票/i.test(text))
    return "points";
  if (/cat|猫|貓|gato|quiet|安静|安靜|calm|tranquil/i.test(text))
    return "discover";
  return "unknown";
}
export const demoAssistant: AssistantAdapter = {
  async answer(text) {
    const match = cats.find((c) =>
      text.toLowerCase().includes(c.name.toLowerCase()),
    );
    if (match)
      return {
        title: match.name,
        body: match.bio,
        links: [
          { href: "/cats/" + match.id, label: "Open Cat ID" },
          {
            href: "/cafes/" + match.cafeId,
            label: cafes.find((c) => c.id === match.cafeId)!.name,
          },
        ],
      };
    switch (assistantIntent(text)) {
      case "discover":
        return {
          title: "A quieter kind of company.",
          body: "Luna and Coco enjoy their own space. Read their sample profiles and let each cat choose the pace.",
          links: [
            { href: "/cats/luna", label: "Luna" },
            { href: "/cats/coco", label: "Coco" },
          ],
        };
      case "nearby":
        return {
          title: "Explore the illustrated neighbourhood.",
          body: "These cafés have no verified coordinates, so we cannot calculate distance or recommend the nearest one. No location permission is needed for this sample map.",
          links: [{ href: "/cafes", label: "Explore café map" }],
        };
      case "birthday":
        return {
          title: "A little plan for your day.",
          body: "Choose a sample package, date and guest count. Your request stays local and needs café approval; no reservation or payment is made.",
          links: [{ href: "/birthday", label: "Plan a birthday" }],
        };
      case "points":
        return {
          title: "Three ways to belong.",
          body: "Paw Points are for rewards. Bond XP grows separately with each cat. Votes are always free.",
          links: [
            { href: "/rewards", label: "Rewards" },
            { href: "/companion", label: "My companion" },
            { href: "/cat101", label: "CAT 101" },
          ],
        };
      default:
        return {
          title: "Let’s start with a little curiosity.",
          body: "Try a cat name, birthday plans, nearby cafés or points. This guide answers from demo content and cannot make bookings or payments.",
          links: [{ href: "/cats", label: "Explore the Cat World" }],
        };
    }
  },
};
