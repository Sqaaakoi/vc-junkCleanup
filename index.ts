import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginSettingDef } from "@utils/types";
import Patches from "./patches";
import { definePluginSettings } from "@api/Settings";

export const ParsedPatches = Object.entries(Patches).map(([patchName, { description, default: defaultValue, patches }]) => {
    return {
        name: patchName,
        setting: {
            type: OptionType.BOOLEAN,
            description,
            default: !!(defaultValue ?? true),
            restartNeeded: true
        } as PluginSettingDef,
        patches: (Array.isArray(patches) ? patches : [patches]).map(p => ({
            ...p,
            predicate: () => settings.store[patchName]
        })),
    };
});

const settings = definePluginSettings(Object.fromEntries(ParsedPatches.map(p => [p.name, p.setting])));

export default definePlugin({
    name: "JunkCleanup",
    description: "Another plugin that cleans up common annoyances in Discord",
    authors: [Devs.Sqaaakoi],
    settings,
    patches: ParsedPatches.flatMap(p => p.patches),
    tags: ["junk", "bloat", "debloat", "shop", "gift", "nitro", "ad", "advertisement", "adblock"]
});
