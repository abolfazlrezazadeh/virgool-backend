import { SetMetadata } from "@nestjs/common"

export const skip_auth = "skip_auth"
export const skipAuth = ()=>SetMetadata(skip_auth,true)