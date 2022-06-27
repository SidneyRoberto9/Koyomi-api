import SetupApplication from './initializer/app';

export const __baseDir = __dirname;

class Server {
  public static async start(): Promise<void> {
    const app = new SetupApplication();
    await app.init();
    app.start();
  }
}

Server.start();
