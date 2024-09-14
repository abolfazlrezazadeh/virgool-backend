import { NotAcceptableException } from "@nestjs/common"
import { Request } from "express"
import { mkdirSync } from "fs"
import { diskStorage } from "multer"
import { extname, join } from "path"
import { publicMessages } from "src/modules/auth/enums/messages.enum"
export type destinationCallBac = (error: Error | null, destination: string) => void
export type fileNameCallBac = (error: Error | null, filename: string) => void
export type fileFilterCallBac = (error: Error | null, acceptFile: boolean) => void
export type destinationFile = Express.Multer.File
export function multerDestination(fieldName: string) {
  return function (req: Request, file: destinationFile, callback: destinationCallBac): void {
    let path = join("public", "uploads", fieldName)
    mkdirSync(path, { recursive: true })
    callback(null, path)
  }
}
export function multerFileName(req: Request, file: destinationFile, callback: fileNameCallBac): void {
  const ext = extname(file.originalname)
  const filename = `${Date.now()}${ext}`
  callback(null, filename)
}
export function fileFilter(req: Request, file: { mimetype: string }, callback: fileFilterCallBac): void {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new NotAcceptableException(publicMessages.ImageFormat), false);
  }
}
export function multerStorage(folderName: string) {
  return diskStorage({
    destination: multerDestination(folderName),
    filename: multerFileName,
  })
}
