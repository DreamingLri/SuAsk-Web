import type { AppRouteRecordRaw } from "@/router/types";
import { isMobile } from "@/utils/device";

const PhoneHome = () => import("@/layout/home/PhoneHome.vue");
const WebHome = () => import("@/layout/home/WebHome.vue");

const LeftSidebar = () => import("@/components/left-sidebar/LeftSidebar.vue");

const AskTeacher = () => import("@/views/ask-teacher/AskTeacher.vue");
const TeacherQuestionBox = () =>
    import("@/views/ask-teacher/TeacherQuestionBox.vue");

export const AskTeacherRoute: AppRouteRecordRaw = {
    path: "/ask-teacher",
    name: "AskTeacherRoot",
    meta: {},
    props: {
        userType: "student",
        deviceType: isMobile() ? "phone" : "desktop",
    },
    component: isMobile() ? PhoneHome : WebHome,
    children: [
        {
            path: "",
            name: "AskTeacher",
            meta: {
                title: "问老师",
            },
            components: {
                default: TeacherQuestionBox,
                left_side: LeftSidebar,
            },
        },
        {
            path: ":teacher_id/:teacher_name",
            name: "AskTeacherDetail",
            meta: {
                NoAlive: true,
            },
            components: {
                default: AskTeacher,
                left_side: LeftSidebar,
            },
        },
    ],
};
