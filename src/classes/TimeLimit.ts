import PasswordMeter from './PasswordStrengthChecker';

export default class TimeLimit {
  private passwordProperty: string;

  private passwordStrengthProperty: number;

  /**
   * Constructs...
   *
   * @param password the password.
   */
  public constructor(password: string) {
    this.passwordProperty = password;
    this.passwordStrengthProperty = new PasswordMeter().getResult(password).score * 500;
  }

  public get password(): string {
    return this.passwordProperty;
  }

  public get timeLimit(): number {
    return this.passwordStrengthProperty;
  }
}
