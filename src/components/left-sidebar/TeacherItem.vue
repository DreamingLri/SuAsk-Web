<template>
    <div class="control-panel-item">
        <control-panel-item id="ask-all" icon="camera-lens" text="看看大家" jumpToPath="/ask-all" />
        <div>
            <div @click="toggleOpen" style="display: flex; align-items: center;">
                <control-panel-item id="question" icon="message" text="我的提问箱" jumpToPath="/ask-me" />
                <svg-icon v-if="!isOpen" icon="arrow-left" color="#808080" size="24px" style="padding-top: 2px;" />
                <svg-icon v-if="isOpen" icon="arrow-down" color="#808080" size="24px" style="padding-top: 2px;" />
            </div>
            <ul v-show="isOpen" class="menu-items">
                <control-panel-item class="menu-item" id="question-new" text="新的提问"
                    jumpToPath="/ask-me/unanswered" />
                <control-panel-item class="menu-item" id="question-old" text="已回答" jumpToPath="/ask-me/answered" />
                <control-panel-item class="menu-item" id="question-top" text="置顶" jumpToPath="/ask-me/top" />
            </ul>
        </div>
        <control-panel-item id="settings" icon="settings" text="设置" jumpToPath="/setting" />
        <control-panel-item id="help" icon="question" text="帮助" jumpToPath="/help" />
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import ControlPanelItem from '@/components/control-panel-item';

// 教师 [我的提问箱] 是否展开
const isOpen = ref(false);
function toggleOpen() {
    isOpen.value = !isOpen.value;
}
</script>

<style scoped lang="scss">
.control-panel-item {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 20px;
}
</style>