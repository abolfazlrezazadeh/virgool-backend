

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
        COOKIE_SECRET:string
        OTP_TOKEN_SECRET:string
        OTP_TOKEN_EXPIRES_IN:string
    }

}