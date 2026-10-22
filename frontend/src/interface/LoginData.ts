interface LoginRequest{
    login : string;
    password : string;
}

interface LoginResponse{
    token : string;
}

export type { LoginRequest, LoginResponse };