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
        data: {
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
            // defaultValue: "['id']",
        },
        handle: {
            label: "Handle class",
            type: "Text",
            section: "settings",
            // defaultValue: "handle",
        },
        group: {
            label: "Group Id",
            type: "Text",
            section: "settings",
            // defaultValue: "artist",
        },
        itemContainer: {
            hidden: true,
            // defaultValue: {
            //     isWwObject: true,
            //     type: "ww-flexbox",
            //     _state: { classes: { default: ["7dd87252-2873-4924-b85a-0cd3443e23eb"] } },
            // },
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
