import { Patch } from "@utils/types";

type StockPatch = Omit<Patch, "plugin">;

interface ConfigurablePatchDefinition {
    /** Description of your patch, shown as the settings description */
    description: string;
    /** Default enable state of the patch. Defaults to true */
    default?: boolean;
    /** Patch or patches. Same as any patch defined within the `patches` array of a plugin definition */
    patches: StockPatch | StockPatch[];
}

// Record key is the setting name for the patch
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
    },

    familyCenterInSettings: {
        description: "Hide the Family Center page in settings. Does not hide the tab in DMs",
        patches: [
            {
                find: ".USER_SETTINGS_MERCH_LINK_CONFIRMED)",
                replacement: {
                    match: /\[\i\.\i\.PRIVACY_FAMILY_CENTER\]:\{/,
                    replace: "$&predicate:()=>false,"
                }
            }
        ]
    },
    merchandiseLink: {
        description: "Hide the Merch button inside settings",
        patches: {
            find: ".USER_SETTINGS_MERCH_LINK_CONFIRMED)",
            replacement: {
                match: /\[\i\.\i\.MERCHANDISE\]:\{/,
                replace: "$&predicate:()=>false,"
            }
        }
    },
    socialLinks: {
        description: "Hide the links to Discord's Social Media profiles",
        patches: {
            find: ".USER_SETTINGS_MERCH_LINK_CONFIRMED)",
            replacement: {
                match: /\[\i\.\i\.SOCIAL_LINKS\]:\{/,
                replace: "$&predicate:()=>false,"
            }
        }
    },
    paymentSettings: {
        description: "Hide the Payment Settings section. May cause side effects.",
        patches: [
            {
                find: ".BILLING_SETTINGS,",
                replacement: {
                    match: /\{header:\i\.\i\.Messages\.BILLING_SETTINGS,.+?\},/,
                    replace: ""
                }
            }
        ],
        default: false
    },

    downloadApps: {
        description: "Hide the Download Apps button in the sidebar",
        patches: {
            find: ".GUILDS_BAR_A11Y_LABEL,",
            replacement: {
                match: /(?<=guildDiscoveryRef,.{0,50}?,)\i(?=\?null:\(0,\i\.jsxs\)\(\i\.Fragment)/,
                replace: "true"
            }
        }
    }

    // transferToConsole: {
    //     description: "Hide the transfer to console button",
    //     patches: [
    //         {
    //             find: 'navId:"transfer-menu"',
    //             replacement: {
    //                 match: /return\(0,\i\.jsx\)\(\i\.Menu,.{0,120}?navId:"transfer-menu",/,
    //                 replace: "return null;$&"
    //             }
    //         }
    //     ]
    // }
};

export default Patches;
