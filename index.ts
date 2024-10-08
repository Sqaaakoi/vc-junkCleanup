import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginSettingDef } from "@utils/types";
import Patches from "./patches";
import { definePluginSettings } from "@api/Settings";
import ManagedExperiments from "./experiments";
import { findStoreLazy } from "@webpack";

export const ParsedPatches = Object.entries(Patches).map(([patchName, { description, default: defaultValue, patches }]) => ({
    name: patchName,
    setting: {
        type: OptionType.BOOLEAN,
        description,
        default: !!(defaultValue ?? true),
        restartNeeded: true
    } as PluginSettingDef,
    patches: (Array.isArray(patches) ? patches : [patches]).map(p => ({
        ...p,
        predicate: () => (p?.predicate ?? (() => true))() && settings.store[patchName]
    })),
}));

export const ParsedManagedExperiments = Object.entries(ManagedExperiments).map(([experimentName, { description, default: defaultValue, experiment, value }]) => ({
    name: experimentName,
    setting: {
        type: OptionType.BOOLEAN,
        description,
        default: !!(defaultValue ?? true),
        restartNeeded: true
    } as PluginSettingDef,
    experiment: {
        id: experiment,
        value
    }
}));

const settings = definePluginSettings(Object.fromEntries([
    ...ParsedPatches.map(p => [p.name, p.setting]),
    ...ParsedManagedExperiments.map(p => [p.name, p.setting])
]));

export default definePlugin({
    name: "JunkCleanup",
    description: "Another plugin that cleans up common annoyances in Discord",
    authors: [Devs.Sqaaakoi],
    settings,
    tags: ["junk", "bloat", "debloat", "shop", "gift", "nitro", "ad", "advertisement", "adblock"],
    patches: [
        ...ParsedPatches.flatMap(p => p.patches),
        {
            find: '"displayName","ExperimentStore"',
            replacement: {
                match: /(getUserExperimentDescriptor)\(\i\)/,
                replace: "$1(...args){return $self.$1(this._original_$1(...args), args);}_original_$&"
            }
        }
    ],

    getUserExperimentDescriptor(experimentDescriptor: any, args: [string]) {
        if (!experimentDescriptor) return experimentDescriptor;
        let experimentId = args[0];
        let overrideEntry = ParsedManagedExperiments.find(i => i.experiment.id === experimentId);
        if (!overrideEntry) return experimentDescriptor;
        let overrideValue = settings.store[overrideEntry.name] ? overrideEntry.experiment.value : null;
        if (overrideValue !== null) experimentDescriptor.bucket = overrideValue;
        return experimentDescriptor;
    }
});
