import { Patch } from "@utils/types";

interface ConfigurablePatchDefinition extends Omit<Patch, "plugin"> {
    description: string;
    default?: boolean;
}

const Patches: Record<string, ConfigurablePatchDefinition> = {
    removeChatboxGiftButton: {
        description: "Remove the nitro gifting button in the chatbox",
        find: '"sticker")',
        replacement: {
            match: /=\i\.gifts/g,
            replace: "=null"
        }
    }
};

export default Patches;
