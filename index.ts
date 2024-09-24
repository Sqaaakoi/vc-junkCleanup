import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginSettingDef } from "@utils/types";
import Patches from "./patches";
import { definePluginSettings } from "@api/Settings";

export const ParsedPatches = Object.entries(Patches).map(([k, v]) => {
    const { description, default: defaultValue, ...patch } = v;
    return {
        name: k,
        description,
        setting: {
            type: OptionType.BOOLEAN,
            description,
            default: !!(defaultValue ?? true)
        } as PluginSettingDef,
        patch: {
            ...patch,
            predicate: () => settings.store[k]
        }
    };
});

const settings = definePluginSettings(Object.fromEntries(ParsedPatches.map(p => [p.name, p.setting])));

export default definePlugin({
    name: "JunkCleanup",
    description: "Cleans up common annoynances in Discord",
    authors: [Devs.Sqaaakoi],
    settings,
    patches: ParsedPatches.map(p => p.patch)
});
