/**
 * 環境変数からの値の取得を徐々にこのクラスからに移していきたい。
 */
export class Environments {

  /**
   * ヘッダーロゴ画像のURLを取得する。
   * @returns
   */
  public static getMocHeaderLogImageUrl(): string {
    return process.env.NEXT_PUBLIC_MOC_HEADER_LOGO_IMAGE_URL || "/logo_long.webp";
  }
}
