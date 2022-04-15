import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = process.env.SERVER_PORT || 3000;
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('ПростоМаркет')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('jxwide')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/docs', app, document)

    await app.listen(port, () => console.log(`server_port: ${port}`));
}
bootstrap();