import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function swaggerConfig(app: INestApplication): void {
    const document = new DocumentBuilder()
    .setTitle("virgool")
    .setDescription("The simulation virgool backend")
    .setVersion("0.0.1")
    // send bearer token in header configs
    .addBearerAuth(swaggerAuthConfig(),"Authorization")
    .setContact("abolfazlrezazadeh","https://github.com/abolfazlrezazadeh","contact.abolfazlrezazadeh@gmail.com")
    .build()
    const swaggerDocument = SwaggerModule.createDocument(app,document)
    SwaggerModule.setup('/swagger',app,swaggerDocument)
}

function swaggerAuthConfig():SecuritySchemeObject{
return {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    description: 'Enter JWT token'  
}
}