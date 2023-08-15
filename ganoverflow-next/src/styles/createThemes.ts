const chroma = require("chroma-js"); // 색변형 lib

interface ColorVariants {
  light: string;
  DEFAULT: string;
  dark: string;
}

interface Theme {
  [colorName: string]: string | ColorVariants;
}

interface Themes {
  light: Theme;
  dark: Theme;
  [key: string]: Theme;
}
function generateColorVariants(color: string): ColorVariants {
  return {
    light: chroma(color).brighten(1.5).hex(),
    DEFAULT: color,
    dark: chroma(color).darken(1.5).hex(),
  };
}

function getContrastText(backgroundColor: string): string {
  return chroma.contrast(backgroundColor, "white") > 2.5 ? "white" : "black";
}

function createThemes(baseColors: { [colorName: string]: string }): Themes {
  const themes: Themes = {
    light: {},
    dark: {},
  };

  for (const colorName in baseColors) {
    if (baseColors.hasOwnProperty(colorName)) {
      const baseColor = baseColors[colorName];
      const variants = generateColorVariants(baseColor);

      themes.light[colorName] = variants.light;
      themes.dark[colorName] = variants.dark;
      themes[colorName] = {
        DEFAULT: variants.DEFAULT,
        contrastText: getContrastText(variants.DEFAULT),
      };
    }
  }

  return themes;
}

export { createThemes };
