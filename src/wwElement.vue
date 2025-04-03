<template>
    <draggable
        v-model="items"
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
        items: {
            get() {
                return wwLib.wwCollection.getCollectionData(this.content.data) || [];
            },
            set(value) {
                this.$emit("trigger-event", { name: "update:list", event: { value } });
            },
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
            return {
                value: data,
            };
        },
        /* wwEditor:end */
        onDragChange(evt) {
            // If an item was removed (i.e. dragged out of this list)
            if (evt.removed) {
                const movedItem = evt.removed.element;
                const toGroup = evt.to?.dataset?.groupId || null;
                const toIndex = evt.newIndex;

                this.$emit("trigger-event", {
                    name: "update:list",
                    event: {
                        value: [...this.items], // current items after removal
                        movedItem,
                        toGroup,
                        toIndex,
                    },
                });
            }
        }
    },
};
</script>
