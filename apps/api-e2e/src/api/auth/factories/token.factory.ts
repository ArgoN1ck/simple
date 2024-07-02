import { AuthApi, SignUpDto, SignUpResponseData } from '@simple/sdk/client';

export class TokenFactory {
  private static api = new AuthApi();

  static async createForUser(params: SignUpDto): Promise<SignUpResponseData> {
    const {
      data: { data },
    } = await TokenFactory.api.signUp(params);

    return data;
  }
}
