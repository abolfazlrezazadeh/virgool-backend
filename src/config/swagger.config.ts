import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function swaggerConfig(app: INestApplication): void {
    const document = new DocumentBuilder()
    .setTitle("virgool")
    .setDescription("The simulation virgool backend")
    .setVersion("0.0.1")
    .setContact("abolfazlrezazadeh","https://github.com/abolfazlrezazadeh","contact.abolfazlrezazadeh@gmail.com")
    .build()
    const swaggerDocument = SwaggerModule.createDocument(app,document)
    SwaggerModule.setup('/swagger',app,swaggerDocument)
}