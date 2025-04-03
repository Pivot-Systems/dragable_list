<template>
    <draggable
        :list="items"
        :itemKey="getItemKey"
        :disabled="isEditing"
        :animation="200"
        :style="{ ...$attrs.style, ...layoutStyle }"
        v-bind="options"
        @change="onDragChange"
        :data-group-id="content.group"
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
    computed: {
        items() {
            return wwLib.wwCollection.getCollectionData(this.content.data) || [];
        },
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
    methods: {
        getItemKey(item) {
            return wwLib.resolveObjectPropertyPath(item, this.content.idPath || "id");
        },
        /* wwEditor:start */
        getTestEvent() {
            const data = wwLib.wwCollection.getCollectionData(this.content.data);
            return { value: data };
        },
        /* wwEditor:end */
        onDragChange(evt) {
            const fromGroup = evt.from?.dataset?.groupId || null;
            const toGroup = evt.to?.dataset?.groupId || null;
            const movedItem = evt.added?.element || evt.removed?.element || evt.moved?.element || null;
            const type = evt.added
                ? "added"
                : evt.removed
                ? "removed"
                : evt.moved
                ? "moved"
                : "unknown";

            this.$emit("trigger-event", {
                name: "update:list",
                event: {
                    type,
                    movedItem,
                    fromGroup,
                    toGroup,
                    index: evt.added?.newIndex ?? evt.removed?.oldIndex ?? evt.moved?.newIndex ?? null,
                },
            });
        },
    },
};
</script>
