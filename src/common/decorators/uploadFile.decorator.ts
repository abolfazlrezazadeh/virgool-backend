import { applyDecorators, ParseFilePipe, UploadedFiles } from "@nestjs/common";


export function uploadOptionalFiles(){
    return  UploadedFiles(new ParseFilePipe({fileIsRequired:false,validators:[]}))
    
}