import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as YAML from 'json2yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as config from 'config';

async function bootstrap() {
  const apiSpecName = config.get('apispec.name');
  const swaggerFilePath = config.get('apispec.swaggerFilePath');
  const app = await NestFactory.create(AppModule);
  const corsConfig = config.get('cors');

  // Create swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sample NestJs App')
    .setDescription('Sample NestJs App')
    .setVersion('1.0')
    .addTag('NestJs')
    .build();

  const jsonSwaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, jsonSwaggerDoc);

  // Convert Swagger JSON doc to YAML doc
  const yamlSwaggerDoc = YAML.stringify(jsonSwaggerDoc);
  const dirName = path.join(__dirname, 'swagger');
  if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
  const filePath = path.join(dirName, `${apiSpecName}`);
  fs.writeFileSync(filePath, yamlSwaggerDoc, 'utf-8');
  fs.writeFileSync(
    path.resolve(process.cwd() + `${swaggerFilePath}`, `${apiSpecName}`),
    yamlSwaggerDoc,
    'utf-8',
  );

  // Allow Additional Properties logic to the swagger doc:
  const schemas = jsonSwaggerDoc?.components?.schemas;
  Object.keys(schemas).forEach((item) => {
    if (schemas[item]['properties']?.allowAdditional) {
      schemas[item]['additionalProperties'] = true;
    } else {
      schemas[item]['additionalProperties'] = false;
    }
  });

  app.enableCors(corsConfig);
  await app.listen(3000);
}

bootstrap();
