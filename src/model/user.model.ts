enum Role {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export interface RegisterForm {
    name: string,
    password: string,
    role: Role,
    token: string, // 搭载 Email 和过期时间
}

export interface ForgetPasswordForm {
    email: string;
    password: string;
}

export interface UpdateUser {
    id: number;
    nickname: string;
    introduction: string;
    avatar: string;
    themeId: number;
}