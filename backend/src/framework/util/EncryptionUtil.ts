import CryptoJS from "crypto-js";

export class EncryptionUtil {
  static mKey = "Felipe";

  static encrypt(aPassword: string): string {
    return CryptoJS.AES.encrypt(aPassword, this.mKey).toString();
  }

  static decrypt(aPasswordEncrypted: string): string {
    const lBytes = CryptoJS.AES.decrypt(aPasswordEncrypted, this.mKey);
    return lBytes.toString(CryptoJS.enc.Utf8);
  }

}

