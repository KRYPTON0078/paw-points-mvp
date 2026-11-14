export const infoPages: Record<
  string,
  { title: string; eyebrow: string; paragraphs: string[] }
> = {
  about: {
    title: "Good company. A thoughtful future.",
    eyebrow: "ABOUT PAW POINTS",
    paragraphs: [
      "Paw Points connects cat identities, café stories and fan communities. Our goal is to make a meaningful connection last beyond a single visit.",
      "This is a fictional consumer product demo. Cats, cafés, stories, prices and partner spaces illustrate the experience; they are not verified commercial operations.",
      "Animal welfare comes first. Staff decide whether an experience is appropriate. A vote, purchase or relationship level never guarantees physical interaction.",
    ],
  },
  contact: {
    title: "Let’s shape the next chapter.",
    eyebrow: "GET IN TOUCH",
    paragraphs: [
      "Interested in a café collaboration, a cat-inspired collection or a more thoughtful fan experience? Contact the team member who shared this demo.",
      "A public contact address and official social channels have not been confirmed. This page does not submit messages or collect contact details.",
    ],
  },
  privacy: {
    title: "Your demo, in this browser.",
    eyebrow: "PRIVACY · DEMO DRAFT",
    paragraphs: [
      "This is a demo privacy explanation, not a finalized privacy policy. Progress, birthday preferences, orders, points and QR entry events are stored in this browser.",
      "There is no account server or cross-device synchronization. You can remove local progress with Reset demo data in Profile; QR entry events are separate browser storage.",
      "The hosting provider may process ordinary connection logs. If you enable browser speech input, your browser may use its speech service. No microphone recordings are saved by this application.",
      "A real launch requires a reviewed policy, retention rules and verified contact details before personal data is collected.",
    ],
  },
  terms: {
    title: "A little clarity before exploring.",
    eyebrow: "TERMS · DEMO DRAFT",
    paragraphs: [
      "This is a product demonstration with fictional data. These draft notes are not finalized commercial terms.",
      "No real payment, reservation, shipment, medical verification or adoption is provided. Demo rewards and balances have no cash value.",
      "CAT 101 is a free local fan activity. Three daily votes reset at midnight in Macau. Seed votes are fictional and your activity is not a global ranking.",
      "Every future animal experience requires independent staff approval, welfare safeguards and availability confirmation.",
    ],
  },
};
