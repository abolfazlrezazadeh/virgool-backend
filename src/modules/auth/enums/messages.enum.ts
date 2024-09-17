

export enum BadRequestMessage {
    InvalidLoginData = 'Invalid login data',
    InvalidRegisterData = 'Invalid register data',
    InvalidToken = 'Invalid token',
    InvalidUser = 'Invalid user',
    InvalidEmail = 'Invalid email',
    InvalidUsername = 'Invalid username',
    InvalidId = 'Invalid id',
    InvalidData = 'Invalid data',
    InvalidRole = 'Invalid role',
    InvalidImage = 'Invalid image',
    InvalidFile = 'Invalid file',
    InvalidFileExtension = 'Invalid file extension',
    InvalidFileType = 'Invalid file type',
    InvalidFileSize = 'Invalid file size',
    InvalidFileCount = 'Invalid file count',
    InvalidFileCountMax = 'Invalid file count max',
    InvalidFileCountMin = 'Invalid file count min',
    InvalidFileCountRange = 'Invalid file count range',
    InvalidFileCountRequired = 'Invalid file count required',
    InvalidFileCountRequiredMax = 'Invalid file count required max',
    InvalidFileCountRequiredMin = 'Invalid file count required min',
    InvalidFileCountRequiredRange = 'Invalid file count required range',
    InvalidFileCountRequiredRequired = 'Invalid file count required required',
    InvalidFileCountRequiredRequiredMax = 'Invalid file count required required max',
    InvalidFileCountRequiredRequiredMin = 'Invalid file count required required min',
    InvalidFileCountRequiredRequiredRange = 'Invalid file count required required range',
    InvalidFileCountRequiredRequiredRequired = 'Invalid file count required required required',
}
export enum AuthMessage {
    NotFoundAccoant = "Accoant not found",
    AlreadyExists = "User already exist",
    TokenExpired = "Token has expired",
    TryAgain = "Please try again",
    WrongOtp = "Wrong otp",
    LoginAgain = "Please login again",
    LoginIsRequired = "Login to your accoant",
    OtpExpired = "Otp has expired",
    EmailNotCorrect ="Email is not correcr"

}

export enum publicMessages {
    Success = "Success",
    Error = "Error",
    SendOtp = "otp was sent successfully ...",
    OtpFailed = "sending otp is failed, please try again ...",
    LoggedIn = "logged in successfully ...",
    Created = "created successfully ...",
    Updated ="Updated successfully",
    AlreadyExist = "already exist ...",
    ImageFormat = "image format is not valid, please use jpg or png files ...",
    ExistEmail = "email already exist ...",
}
export enum CategoryMessages {
    CategoryNotFound = "Category not found",
    Deleted = "Category deleted successfully ",
    Updated = "Category updated successfully ",
}
