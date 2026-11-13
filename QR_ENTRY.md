# QR entry

The default public origin is https://paw-points-mvp.vercel.app. For local QR testing, optionally set NEXT_PUBLIC_SITE_URL=http://localhost:3000 and rebuild. For a Preview URL, set it to that exact public HTTPS origin and rebuild. No other QR environment variable is required. A preview built without this override will intentionally link to the existing production version, not the preview.

Routes: /enter?cafe=pawbrew, /cats/mochi?source=qr, /cats/luna?source=qr, /qr-generator.

QR studio exports PNG and SVG with quiet zones. Never print localhost codes. Confirm deployed routes are public (no deployment protection), decode all printed codes and test on physical phones first.

Demo entry events are bounded to the latest 500 records in browser localStorage under paw-qr-events. Records contain cafeId, optional catId, source QR and ISO timestamp only. Blocked storage does not prevent browsing. EntryAnalytics is the future server analytics adapter interface; no server analytics or cross-device reporting is implemented.

2.1 preserves the pawbrew alias, all five cat IDs, PNG/SVG generation and local analytics. It adds concept café destinations garden-house and moon-room; those public links require an approved 2.1 production release. GitHub Pages builds retain their configured base path.

2026-11-13 verification: generated QR image and public target inspected in the browser; the local cafe entry and Mochi source=qr link were exercised. Automated PNG/SVG payload tests passed. The test browser blocked downloading data: URLs under its security policy; download completion, barcode decoding and physical iPhone/Android scans remain unverified. See docs/QA_2_1.md. No production deployment was performed.
