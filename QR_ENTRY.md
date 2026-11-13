# QR entry

Set NEXT_PUBLIC_SITE_URL=http://localhost:3000 locally. For production set it to the actual public HTTPS deployment origin and rebuild. No other QR environment variable is required.

Routes: /enter?cafe=pawbrew, /cats/mochi?source=qr, /cats/luna?source=qr, /qr-generator.

QR studio exports PNG and SVG with quiet zones. Never print localhost codes. Confirm deployed routes are public (no deployment protection), decode all printed codes and test on physical phones first.

Demo entry events are bounded to the latest 500 records in browser localStorage under paw-qr-events. Records contain cafeId, optional catId, source QR and ISO timestamp only. Blocked storage does not prevent browsing. EntryAnalytics is the future server analytics adapter interface; no server analytics or cross-device reporting is implemented.

Existing uncommitted 2.0 work was present before QR implementation. It must be reviewed and committed by its owner before a complete 2.0 deployment can be reproduced from Git.
