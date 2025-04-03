<template>
    <draggable
        v-model="internalItems"
        :itemKey="getItemKey"
        :disabled="isEditing"
        :animation="200"
        :style="{ ...$attrs.style, ...layoutStyle }"
        v-bind="options"
        @change="onDragChange"
    >
        <template #item="{ element, index }">
            <div>
                <wwLayoutItemContext is-repeat :data="element" :item="null" :index="index">
                    <wwElement v-bind="content.itemContainer" />
                </wwLayoutItemContext>
            </div>
        </template>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components: { draggable },
    props: {
        content: { type: Object, required: true },
        wwEditorState: { type: Object, default: null },
    },
    emits: ["trigger-event"],
    setup() {
        return { layoutStyle: wwLib.useLayoutStyle() };
    },
    data() {
        return {
            internalItems: [],
        };
    },
    computed: {
        isEditing() {
            return this.wwEditorState?.isEditing;
        },
        options() {
            const options = {};
            if (this.content.handle?.length) {
                options.handle = `.${this.content.handle}`;
            }
            if (this.content.group) {
                options.group = this.content.group;
            }
            return options;
        },
    },
    watch: {
        // Keep internalItems in sync with external changes
        'content.data': {
            handler(newVal) {
                const items = wwLib.wwCollection.getCollectionData(newVal) || [];
                this.internalItems = [...items];
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        getItemKey(item) {
            return wwLib.resolveObjectPropertyPath(item, this.content.idPath || "id");
        },
        /* wwEditor:start */
        getTestEvent() {
            return {
                value: this.internalItems,
            };
        },
        /* wwEditor:end */
        onDragChange(evt) {
            // Force update to trigger WeWeb
            this.$emit("trigger-event", {
                name: "update:list",
                event: { value: [...this.internalItems] },
            });
        },
    },
};
</script>
