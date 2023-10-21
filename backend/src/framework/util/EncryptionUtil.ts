import * as bcrypt from "bcrypt";

export class EncryptionUtil {
  static mKey = 7;

  static async encrypt(aPassword: string): Promise<string> {
    return bcrypt.hash(aPassword, this.mKey);
  }

  static async compare(aPassword: string, aPasswordEncrypted: string): Promise<boolean> {
    return bcrypt.compare(aPassword, aPasswordEncrypted);
  }

}

