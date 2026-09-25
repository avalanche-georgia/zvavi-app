# Features

## Region Picker

The homepage shows an interactive map of all active forecast regions, each polygon colored by its current overall hazard level. Tapping a region opens a summary popup with the hazard icon, level, and a link to the region page. The selected region is remembered between visits.

## Avalanche Forecasts

Daily professional forecasts for each active region in the Georgian backcountry. Each forecast includes:

- **Danger levels** for multiple elevation zones (sub-alpine, alpine, high-alpine) on the standard 1–5 European scale
- **Avalanche problem breakdown** — up to 9 problem types (storm slab, wind slab, persistent slab, wet slab, cornices, etc.) with affected aspects, elevation bands, likelihood, and size
- **Narratives** — weather outlook, snowpack assessment, and additional hazard notes written by certified forecasters
- **Recent avalanche history** — observed natural and human-triggered events with location, size, and date

Forecasts are authored in a draft/publish workflow, so forecasters can prepare and review before going live.

## Forecast Area Map

Interactive map showing the forecast area boundary for each region, giving users a clear spatial reference for where the forecast applies.

## Forecast Archive

Full history of past forecasts, browsable by date, so users can track how conditions evolved through the season.

## Weather Stations

Links to real-time data from mountain weather stations in the forecast area.

## Member Verification

Each team member receives a unique QR code. Scanning it opens a verification page that confirms their current membership status, helping partners quickly authenticate credentials.

## Join / Apply

A public application form for individuals interested in joining the avalanche forecasting team. Submitted applications are reviewed by administrators.

## Public Observations

Anyone can report an avalanche they've witnessed — no account needed. The submission form is built for phones in the field: large, easy-to-tap choices instead of dropdowns, one-tap dates (today, yesterday, a picked date or "not sure"), and a bar that stays on screen showing which required answers are still missing. It asks the person to mark the location on a map (required, so every new report can be shown on a map) — by tapping, dragging the pin, using their phone's current location, or typing coordinates — choose the avalanche type, trigger and size (each size explained in plain words), pick the affected slopes on a compass for each elevation band (tap or drag across directions, and copy a selection to the other bands in one tap), describe what they saw, attach up to three photos, and optionally share their name and background. If they choose "Remember my details on this device", their details are kept in that browser only and the next report starts with a short "Reporting as" summary instead of empty fields; "Forget me" removes them at any time. The Privacy Policy explains what is collected with a report, what is published and how remembered details are handled. Photos are shrunk automatically on the reporter's phone before sending, so even large camera shots upload quickly on a mountain connection, and each one can be previewed full-screen before submitting. Photos are stored without any hidden metadata such as the location where they were taken. After sending, a confirmation screen offers to submit another report or go to the observations page. Every submission is reviewed by the forecasting team before it appears publicly, so nothing unchecked reaches the site. Until then, the person who sent it sees their own report on the observations page marked "Under review" (on that device only), and the team gets a notification with a direct link to review it.

The observations page shows reports as a list and on a map of the region side by side (on phones, switch between the two). The list loads more reports as you scroll, and the map always shows every matching report, grouping nearby ones into numbered bubbles that split apart as you zoom in. Reports are grouped by date — today, yesterday, this week, then by month — and can be filtered to the last 7 or 30 days, the current season (November to May) or a custom date range, based either on when the avalanche happened or when it was reported — reports whose date the observer didn't know have their own filter — and sorted newest or largest first. Each report opens into a detail view with its photos (tap for full-screen), size, trigger, dimensions, the slopes affected, the description and the reporter's first name with last initial. From there, "Show on map" gives a close-up map with copyable coordinates and a link to open the spot in a maps app. Filtered views and individual reports have their own links that can be shared. Contact details and other personal information submitted with a report are only ever visible to forecasters.

## Partners

A showcase of partner organizations supporting the Georgian avalanche forecasting program.

---

## Admin Panel

A password-protected back-office for the forecasting team.

### Forecast Authoring
Forecasters can create, edit, duplicate, and publish forecasts through a structured form covering all hazard levels, problem types, and narrative fields. Drafts are invisible to the public until explicitly published.

### Recent Avalanche Catalog
Administrators can browse all recorded avalanches in a compact paginated table showing who submitted each one, and filter it by occurrence or creation date, by source (team or public) and by status. Clicking a record opens it in a side panel next to the list, with everything about it — photos, dimensions, slopes affected, location, description, who submitted it and which forecasts it's attached to — and it can be edited right there without losing your place in the list. Arrows (or the keyboard) step to the previous or next record, and "Show on map" opens a close-up map with copyable coordinates. Records can be published or unpublished with one click; archiving and restoring are done by changing the status while editing, and an unfinished edit is never thrown away without asking. Each record shows whether it was logged by the forecasting team or submitted by the public. Coordinates are required for every new avalanche record; older records saved without them can still be edited.

### Observation Review
Public submissions wait in a dedicated review queue, oldest first, until a forecaster approves them (one click) or rejects them. After each decision the panel moves on to a neighbouring report still waiting, so a queue can be cleared without going back to the list. Approved reports join the public observations page and the avalanche catalog; rejected ones are archived, not deleted. The admin menu shows how many reports are waiting, and each region tab shows its own count.

### Member Management
Administrators can manage the team roster: add members, update their status (active, inactive, pending, suspended, expired), set membership validity dates, and generate or view their verification QR codes.

### Staff Profiles
Forecasters and administrators can view and edit their own profile — including display name, a short bio, and a profile photo. The photo and name are shown in the admin panel header. When creating a forecast, the forecaster field is automatically prefilled with the logged-in user's name.

### Weather Station Management
Administrators can manage the list of mountain weather stations: add, edit, delete, and reorder them via drag-and-drop. Each station has a name in English and Georgian, an altitude, and a link to its live data feed.

### Partner Benefits Management
Administrators can manage a list of partner organizations and the exclusive discounts or perks they offer to Avalanche Georgia members. Each partner has a name, optional benefit description, logo, and website — all stored in both English and Georgian. Active partners are displayed to the public in a "Member Benefits" drawer accessible from the Join Us page and the member verification card.

---

## Bilingual Support

The entire public site is available in **English** and **Georgian**, with automatic language detection based on user preference. All forecast content, UI labels, and notifications are fully translated.

---

## Accessibility & Performance

- Mobile-responsive design for use in the field
- Monitored with Vercel Analytics and Speed Insights for performance and usage trends