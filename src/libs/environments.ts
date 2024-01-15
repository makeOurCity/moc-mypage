/**
 * 環境変数からの値の取得を徐々にこのクラスからに移していきたい。
 */
export class Environments {

  /**
   * ヘッダーロゴ画像のURLを取得する。
   * @returns
   */
  public static getMocHeaderLogoImageUrl(): string {
    return process.env.NEXT_PUBLIC_MOC_HEADER_LOGO_IMAGE_URL || "/logo_long.webp";
  }

  /**
   * ヘッダーロゴテキストを取得する。
   * ロゴ画像の指定があってもテキスト指定がある場合はテキストを優先する。
   * @returns
   */
  public static getMocHeaderLogoText(): string | undefined {
    return process.env.NEXT_PUBLIC_MOC_HEADER_LOGO_TEXT;
  }

  /**
   * チュートリアルURLの取得
   * @returns
   */
  public static getTutorialUrl(): string | undefined {
    return process.env.NEXT_PUBLIC_MOC_TUTORIAL_URL;
  }
}
