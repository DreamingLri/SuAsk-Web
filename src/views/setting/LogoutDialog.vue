<template>
    <div class="dialog">
        <el-dialog
            v-model="visible"
            :show-close="false"
            align-center
            width="300px"
        >
            <div class="title">确定要退出登录吗?</div>
            <div class="main">
                <el-button @click="logout" type="primary">确定</el-button>
                <el-button @click="visible = false" type="default"
                    >取消</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ControlPanelStore } from "@/store/modules/control-panel";
import { UserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const visible = defineModel("visible", { type: Boolean, default: true });

const userStore = UserStore();
const sidebarStore = ControlPanelStore();

const router = useRouter();

async function logout() {
    try {
        const res = await userStore.logout();
        sidebarStore.clearSelectedItem();

        // console.log(res);
        if (res) {
            ElMessage.success("退出登录成功");
            // console.log(res);
            router.push({ name: "Login" });
        } else {
            ElMessage.error("退出登录失败");
        }
    } catch (e) {
        ElMessage.error((e as unknown as Error).message);
    }
}
</script>

<style scoped lang="scss">
.dialog {
    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .main {
        display: flex;

        justify-content: space-between;
        align-items: center;
    }
}

:deep(.el-dialog) {
    border-radius: 20px;
}

:deep(.el-dialog__header) {
    padding: 0;
}
</style>
