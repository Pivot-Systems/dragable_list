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
    triggerEvents: [
        {
            name: "update:list",
            label: { en: "On List update" },
            event: { value: "" },
            getTestEvent: "getTestEvent",
            default: true,
        },
    ],
    properties: {
        items: {
            bindable: true,
            section: "settings",
            label: "Items",
            type: "Info",
            options: {
                text: { en: "Elements to repeat" },
            },
        },
        idPath: {
            label: {
                en: "Unique id",
            },
            type: "ObjectPropertyPath",
            options: (content) => ({
                object: getDataObject(content),
            }),
            hidden: (content) => !hasData(content),
            section: "settings",
        },
        itemContainer: {
            hidden: true,
            defaultValue: { isWwObject: true, type: "ww-flexbox" },
        },
    },
};

function getDataObject(content) {
    if (!content.data) return {};
    if (Array.isArray(content.data)) {
        return content.data[0] || {};
    }
    if (Array.isArray(content.data.data)) {
        return content.data.data[0] || {};
    }
    return {};
}
function hasData(content) {
    if (!content.data) return false;
    if (Array.isArray(content.data)) {
        return content.data.length;
    }
    if (Array.isArray(content.data.data)) {
        return content.data.data.length;
    }
    return false;
}
