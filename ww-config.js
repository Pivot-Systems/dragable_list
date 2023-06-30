export default {
    options: {
        layout: ["flex"],
    },
    inherit: {
        type: "ww-layout",
    },
    editor: {
        label: {
            en: "Sortable list",
        },
        icon: "border",
        bubble: {
            icon: "border",
        },
    },
    properties: {
        items: {
            bindable: "repeatable",
            section: "settings",
            label: "Items",
            type: "Info",
            options: {
                text: { en: "Elements to repeat" },
            },
        },
    },
};
