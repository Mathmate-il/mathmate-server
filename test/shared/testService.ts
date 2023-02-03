// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class Test {
  public googleClientCredentials: string;
  constructor() {
    this.googleClientCredentials = process.env.GOOGLE_CLIENT_CREDENTIALS;
  }

  public get getGoogleClientCredentials() {
    return this.googleClientCredentials;
  }
}

const testService = new Test();
export default testService;
