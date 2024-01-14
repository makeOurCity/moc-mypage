import fs from "fs";
import satori from "satori";

export default async function TextLogo(text: string) {
  const fontData = fs.readFileSync("public/fonts/NotoSerifJP-Bold.otf");
  // const fontData = await fetch("https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap").then((resp) => resp.arrayBuffer());

  const svg = await satori(
    <div style={{ color: "black" }}>{ text }</div>,
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "NotoSerifJP-Bold",
          data: fontData,
          weight: 400,
          style: "normal",
          lang: "ja-JP",
        },
      ],
    }
  );

  return svg;
}
