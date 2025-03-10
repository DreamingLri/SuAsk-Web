<template>
    <div class="dialog">
        <el-dialog
            v-model="visible"
            :show-close="deviceTypeStore.isMobile"
            align-center
            width="400px"
            :fullscreen="deviceTypeStore.isMobile"
        >
            <div class="dialog-content">
                <div class="title">重置密码</div>
                <div class="send-code">
                    <el-input
                        v-model="mail"
                        style="height: 40px"
                        placeholder="请输入注册邮箱"
                        disabled
                    >
                        <template #prefix>
                            <svg-icon icon="mail" color="#71B6FF" size="20px" />
                        </template>
                    </el-input>
                    <div class="verification-code">
                        <el-input
                            v-model="code"
                            style="height: 40px"
                            placeholder="请输入验证码"
                            clearable
                        />
                        <el-button
                            @click="getCode"
                            type="primary"
                            style="height: 40px; width: 6rem"
                            :disabled="verifyStatus.disabled"
                            >{{
                                verifyStatus.disabled
                                    ? verifyStatus.duration
                                    : "获取验证码"
                            }}</el-button
                        >
                    </div>
                </div>
                <div class="reset">
                    <el-input
                        v-model="newPassword"
                        placeholder="请输入新密码"
                        style="height: 40px"
                        clearable
                        show-password
                    >
                    </el-input>
                    <el-input
                        v-model="confirmPassword"
                        placeholder="请再次输入新密码"
                        style="height: 40px"
                        clearable
                        show-password
                    >
                    </el-input>
                    <div class="button">
                        <el-button @click="resetPassword" type="primary"
                            >重置</el-button
                        >
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { resetPasswordApi, sendCodeApi } from "@/api/user/reset_password.api";
import type { ResetPassword } from "@/model/user.model";
import { DeviceTypeStore } from "@/store/modules/device-type";
import { UserStore } from "@/store/modules/user";
import { mailCheck } from "@/utils/login/register";
import { ElMessage } from "element-plus";
import { computed, reactive, ref } from "vue";

const visible = defineModel("visible", { type: Boolean, default: true });

const deviceTypeStore = DeviceTypeStore();

const userStore = UserStore();
const basicInfo = computed(() => userStore.getUser());

const mail = computed(() => userStore.getUser().email);
const code = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const verifyStatus = reactive<{
    disabled: boolean;
    duration: number;
    timer: any;
}>({
    disabled: false,
    duration: 60,
    timer: null,
});
function getCode() {
    sendCodeApi({ email: mail.value, type: "reset_password" })
        .then((res) => {
            if (res.msg === "200") {
                ElMessage.success("验证码已发送");
                // console.log(res);
                verifyStatus.disabled = true;
                verifyStatus.timer && clearInterval(verifyStatus.timer);
                verifyStatus.timer = setInterval(() => {
                    verifyStatus.duration--;
                    if (verifyStatus.duration === 0) {
                        verifyStatus.disabled = false;
                        verifyStatus.duration = 60;
                        clearInterval(verifyStatus.timer);
                    }
                }, 1000);
            } else {
                ElMessage.error(res.msg);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function resetPassword() {
    if (code.value == "") {
        ElMessage.error("请输入验证码");
        return;
    }
    if (newPassword.value == "") {
        ElMessage.error("请输入新密码");
        return;
    }
    if (confirmPassword.value == "") {
        ElMessage.error("请再次输入新密码");
        return;
    }
    if (newPassword.value != confirmPassword.value) {
        ElMessage.error("两次输入密码不一致");
        return;
    }
    const data: ResetPassword = {
        email: mail.value,
        code: code.value,
        password: newPassword.value,
    };
    resetPasswordApi(data)
        .then((res) => {
            if (res) {
                ElMessage.success("重置成功");
                visible.value = false;
            } else {
                ElMessage.error("验证码错误");
                visible.value = false;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

<style scoped lang="scss">
.dialog {
    display: flex;
    flex-direction: column;

    .dialog-content {
        @media (max-width: 768px) {
            margin-top: 25vh;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .send-code {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .verification-code {
                display: flex;
                width: 100%;
                justify-content: space-between;
                gap: 10px;
            }
        }

        .reset {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;

            .button {
                width: 100%;
                display: flex;
                justify-content: end;

                .el-button {
                    width: 40%;
                    height: 30px;
                    border-radius: 15px;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    :deep(.el-dialog) {
        border-radius: 20px;
    }
}

:deep(.el-dialog__header) {
    padding: 0;
}
</style>
