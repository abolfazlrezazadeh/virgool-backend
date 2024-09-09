import { ProfileDto } from "src/modules/user/dto/profile.dto"


export function deleteEmptyInputs(obj: ProfileDto) {
  
    Object.keys(obj).forEach(key => {
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
            delete obj[key]
        }
    })
    
  return obj
}