import fs from "fs";
import satori from "satori";

export default async function TextLogo(text: string) {
  const fontData = fs.readFileSync("public/fonts/NotoSerifJP-Bold.otf");
  // const fontData = await fetch("https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap").then((resp) => resp.arrayBuffer());

  const svg = await satori(
    <pre style={{
      color: "black",
      fontSize: "1.5em",
      textAlign: "center",
      lineHeight: "0.9em",
    }}>{ text }</pre>,
    {
      width: 180,
      height: 80,
      fonts: [
        {
          name: "Noto Serif JP",
          data: fontData,
          weight: 800,
          style: "normal",
          lang: "ja-JP",
        },
      ],
    }
  );

  return svg;
}
