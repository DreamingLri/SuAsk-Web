<template>
    <MdEditor
        :footers="[]"
        placeholder="请输入..."
        :preview="false"
        :toolbars="toolbars"
        v-model="contents"
        :style="{ height: fullscreen ? '100%' : '350px' }"
        class="md"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

defineProps<{
    fullscreen?: boolean
}>()

const toolbars: ToolbarNames[] = ['previewOnly']

const contents = ref('')
</script>

<style scoped lang="scss">
.md {
    border-radius: 10px;
}
</style>
