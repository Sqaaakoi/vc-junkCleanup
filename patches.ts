import { Patch } from "@utils/types";

type StockPatch = Omit<Patch, "plugin">;

interface ConfigurablePatchDefinition {
    description: string;
    default?: boolean;
    patches: StockPatch | StockPatch[];
}

const Patches: Record<string, ConfigurablePatchDefinition> = {
    removeChatboxGiftButton: {
        description: "Remove the nitro gifting button in the chatbox",
        patches: {
            find: '"sticker")',
            replacement: {
                match: /=\i\.gifts/g,
                replace: "=null"
            }
        }
    },
    removeChatboxGifsButton: {
        description: "Remove the GIFs button in the chatbox",
        patches: {
            find: '"sticker")',
            replacement: {
                match: /=\i\.gif/g,
                replace: "=null"
            }
        },
        default: false
    },
    removeChatboxStickerButton: {
        description: "Remove the sticker button in the chatbox",
        patches: {
            find: '"sticker")',
            replacement: {
                match: /=\i\.sticker/g,
                replace: "=null"
            }
        },
        default: false
    },

    nitroAndShopPages: {
        description: "Hide the Nitro and Shop pages in DMs",
        patches: [
            {
                find: "hasLibraryApplication()&&",
                replacement: [
                    {
                        match: /\i\.\i\.APPLICATION_STORE,/,
                        replace: "null,"
                    },
                    {
                        match: /\i\.\i\.COLLECTIBLES_SHOP,/,
                        replace: "null,"
                    }
                ]
            },
            {
                find: ".PRIVATE_CHANNELS_A11Y_LABEL",
                replacement: [
                    {
                        match: /\(0,\i\.\i\)\(.{0,350}?\},"premium"\),/,
                        replace: ""
                    },
                    {
                        match: /\(0,\i\.\i\)\(.{0,250}?\},"discord-shop"\),/,
                        replace: ""
                    },
                ]
            }
        ]
    },

    familyCenterInSettings: {
        description: "Hide the Family Center page in settings",
        patches: [
            {
                find: ".BILLING_SETTINGS,",
                replacement: {
                    match: /\i\.\i\.PRIVACY_FAMILY_CENTER,/,
                    replace: ""
                }
            }
        ]
    },

    profileEditorShopUpsell: {
        description: "Hide the collectibles upsell banner in the Profiles settings",
        patches: {
            find: '"CollectiblesUpsellBanner"',
            replacement: {
                match: /"CollectiblesUpsellBanner".{0,150}?return /,
                replace: "$&null;"
            }
        }
    },

    updateReadyButton: {
        description: "Hide the Update Ready! button",
        patches: {
            find: 'case"UPDATE_DOWNLOADED":',
            replacement: {
                match: /switch\(this\.props\.mode\)/,
                replace: "return null;$&"
            }
        },
        default: false
    }

    // transferToConsole: {
    //     description: "Hide the transfer to console button",
    //     patches: [
    //         {
    //             find: '"transfer-".concat',
    //             replacement: {
    //                 match: /(return )(\(0,\i\.jsx\)\(\i\.Fragment)/,
    //                 replace: "$1null;$2"
    //             }
    //         }
    //     ]
    // }
};

export default Patches;
