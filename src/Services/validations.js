export const EMAIL_VALIDATION={
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: "Email is not valid",
    },
}

export const PASSWORD_VALIDATION={
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
      message: "Password must be at least 6 characters and include letters, numbers, and special characters",
    },
}

export const OTP_VALIDATION={
    required: "OTP is required",
    pattern: {
    value: /^[a-zA-Z0-9]{4,}$/,
    message: "OTP must be at least 4 characters and contain only letters or numbers",
    },
}

export const CONFIRMPASSWORD_VALIDATION={
    required: "confirmPassword is required",
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
      message: "confirmPassword must match Password ",
    },
}