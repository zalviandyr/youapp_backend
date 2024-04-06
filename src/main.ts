import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // listen to port
  await app.listen(port);
  console.log(`App is running on http://localhost:${port}`);

  // get all routes
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(availableRoutes);
}
bootstrap();
