import app from './app';
import { ConfigService } from './services/config.service';

const port = ConfigService.config.PORT;

const server = app.listen(port, () => {
  console.log(`Server listening :${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  console.log('Closing http server');
  server.close((err) => {
    console.log('Server closed');
    process.exit(err ? 1 : 0);
  });
});
