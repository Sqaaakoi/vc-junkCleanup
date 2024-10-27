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
                match: /=\i\.gifts?/g,
                replace: "=null"
            }
        }
    },
    removeChatboxGifsButton: {
        description: "Remove the GIFs button in the chatbox",
        patches: {
            find: '"sticker")',
            replacement: {
                match: /=\i\.gifs?/g,
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
                match: /=\i\.stickers?/g,
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
                match: /\i(?=\?null:\(0,\i\.jsxs\)\(\i\.Fragment,{children:\[\(0,\i\.jsx\))/,
                replace: "true"
            }
        }
    },

    contentInventory: {
        description: "Hide the Activity Feed in the members list",
        patches: {
            find: /hasFeature\(\i\.\i\.ACTIVITY_FEED_ENABLED_BY_USER\)/,
            replacement: {
                match: /(?=let.{0,50}?hasFeature\(\i\.\i\.ACTIVITY_FEED_ENABLED_BY_USER\))/,
                replace: "return false;"
            }
        },
        default: false
    },

    contentInventoryProfilePanel: {
        description: "Hide the Recent Activity section in the DM profile sidebar",
        patches: {
            find: "UserProfilePanelRecentActivity",
            replacement: {
                match: /0===\i\.length/,
                replace: "true"
            }
        },
        default: false
    },

    activeNow: {
        description: "Hide the Active Now sidebar in the Friends page",
        patches: {
            find: ".FRIENDS_SECTION_ONLINE",
            replacement: {
                match: /,\(0,\i\.jsx\)\("div",{className:\i.nowPlayingColumn,children:\(0,\i.jsx\)\(\i\.\i,{}\)}\)/,
                replace: ""
            }
        },
        default: false
    },

    transferToConsole: {
        description: "Hide the transfer to console button",
        patches: [
            {
                find: '"transfer-".concat',
                replacement: {
                    match: /(?<=function \i\(\i\){)(?=let.{0,500}?"Console Transfer Item")/,
                    replace: "return null;"
                }
            },
            {
                find: 'navId:"transfer-menu"',
                replacement: {
                    match: /(?<=function \i\(\i\){)(?=let.{0,500}?twoWayLink)/,
                    replace: "return null;"
                }
            }
        ]
    },

    textChannelActivityNameHeader: {
        description: "Hide the activity name above expanded activities in text channels",
        patches: {
            find: ".activityPanelContainer,",
            replacement: {
                match: /\i\?null:\(0,\i\.jsx\)\("div",{className:\i\.header,.{0,150}\i\.name}\)}\),/,
                replace: ""
            }
        }
    },

    inviteToServer: {
        description: "Hide the Invite to Server context menu option",
        patches: {
            find: 'id:"invite-to-server"',
            replacement: {
                match: /(?=return.{0,200}?id:"invite-to-server")/,
                replace: "return null;"
            }
        }
    },

    clippingEnabledToast: {
        description: "Hide the clipping enabled; your voice may be recorded warning when joining a voice channel, without disabling your voice from being clipped",
        patches: {
            find: 'id:"CLIPS_IN_CALL_WARNING"',
            replacement: {
                match: /(?<=showClipsToast\(\){)/,
                replace: "return;"
            }
        }
    },

    createInviteButtonOnChannels: {
        description: "Hide the Create Invite button on channels in the sidebar",
        patches: {
            find: 'tutorialId:"instant-invite",',
            replacement: {
                match: /(?<=return)(?=.{0,50}?"instant-invite")/,
                replace: ";"
            }
        }
    },
    editChannelButton: {
        description: "Hide the Edit Channel button on channels in the sidebar",
        patches: {
            find: 'tutorialId:"instant-invite",',
            replacement: {
                match: /(?<=return)(?=.{0,50}?\.Messages\.EDIT_CHANNEL)/,
                replace: ";"
            }
        },
        default: false
    },

    boostProgressBar: {
        description: "Hide the Server Boost progress bar in all servers",
        patches: {
            find: ".premiumProgressBarEnabled&&",
            replacement: {
                match: /\i\.push(?=\(\i\.\i\.(GUILD_PREMIUM_PROGRESS_BAR|GUILD_NEW_MEMBER_ACTIONS_PROGRESS_BAR)\))/g,
                replace: ""
            }
        }
    },

};

export default Patches;
