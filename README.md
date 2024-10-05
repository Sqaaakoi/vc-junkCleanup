# JunkCleanup

Another plugin that cleans up common annoyances in Discord

Does not inject styles, uses Vencord patches

## Installation

See https://docs.vencord.dev/installing/custom-plugins/ (clone into the `src/userplugins` folder)

## Removed Junk

- Chatbox buttons
  - Gift button
  - GIFs button (disabled by default)
  - Stickers button (disabled by default)
- Nitro and Shop pages in DMs
- Profile editor shop upsell banner
- Update Ready! button (disabled by default)
- Settings pages / sidebar buttons
  - Family Center
  - Merchandise
  - Social Media links
  - Payment section (disabled by default, as it can be opened other places in the app, and hiding it will cause a blank screen)
- Activity Feed in members list (disabled by default)
- Active Now sidebar (disabled by default)

## Coming soon

- Transfer voice to console options (I haven't figured out how to do it properly yet)
- Quest promotions (when Discord actually does another quest)

## Contributing / Adding your own patch

Patches are not located in the plugin object. Patches are instead defined a special wrapper object within the `Patches` object in [patches.ts](./patches.ts). See the types and comments for more details.

These wrapper objects are parsed in [index.ts](./index.ts) to provide settings + associated enabled predicate for each patch.

