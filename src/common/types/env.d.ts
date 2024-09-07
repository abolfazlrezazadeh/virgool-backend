

namespace NodeJS {
    interface ProcessEnv {
        //applicationn
        PORT: number
        //dataBase
        DB_PORT: number
        DB_NAME: string
        DB_HOST: string
        DB_USERNAME: string
        DB_PASSWORD: string,
        //cookie
        COOKIE_SECRET: string
        OTP_TOKEN_SECRET: string
        // accessToken
        ACCESS_TOKEN_SECRET: string
        REFRESH_TOKEN_SECRET: string
    }

}