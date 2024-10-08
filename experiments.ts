interface ManagedExperiment {
    /** Description of the experiment, shown as the settings description */
    description: string;
    /** Default enable state of the patch. Defaults to true */
    default?: boolean;
    // Experiment string ID
    experiment: string;
    // Experiment bucket
    value: number;
}

// Record key is the setting name for the experiment
const ManagedExperiments: Record<string, ManagedExperiment> = {
    appLauncher: {
        description: "Disable the App Launcher in the chat bar",
        experiment: "2023-11_app_launcher_desktop",
        value: -1
    }
};

export default ManagedExperiments;
