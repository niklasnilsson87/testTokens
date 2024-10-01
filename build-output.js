import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

// Registrera transform med plattform 'css' (standard)
register(StyleDictionary, { platform: 'css' });

const VARIABLES = [
  { set: "core", destination: "core" },
  { set: "semantic", references: ["core"] },
  {
    set: "semantic.light",
    references: ["core"],
  },
  {
    set: "semantic.dark",
    selector: '.dark',
    references: ["core"],
  },
  {
    set: "component",
    references: ["core", "semantic", "semantic.light", "semantic.dark"],
  },
];

const THEMES = [
  {
    set: "component",
    output: "light",
    references: ["core", "semantic", "semantic.light"],
  },
  {
    set: "component",
    output: "dark",
    selector: '.dark',
    references: ["core", "semantic", "semantic.dark"],
  },
];

/**
 * Get common css config for style dictionary
 */
const getCssConfig = ({
  buildPathSubdirectory,
  destination,
  filter,
  fileHeader,
  outputReferences,
  selector,
}) => ({
  transforms: [
    "ts/descriptionToComment",
    "ts/opacity",
    "ts/size/lineheight",
    "ts/typography/fontWeight", // Uppdaterat transform-namn
    "ts/color/modifiers",
    "ts/size/css/letterspacing",
    "ts/color/css/hexrgba",
    "border/css/shorthand", // Använd den inbyggda Style Dictionary-transformen
    "typography/css/shorthand", // Använd den inbyggda Style Dictionary-transformen
    "shadow/css/shorthand", // Använd den inbyggda Style Dictionary-transformen
    "name/kebab", // Denna är korrekt
  ],
  prefix: "ehm",
  buildPath: `css/${buildPathSubdirectory}/`,
  files: [
    {
      destination: `_${destination}.css`,
      format: "css/variables",
      filter,
      options: {
        outputReferences,
        fileHeader,
        selector,
      },
    },
  ],
});

/**
 * Build token set variables
 */
VARIABLES.forEach(({ set, selector, references }) => {
  const buildPathSubdirectory = "variables";
  const filter = (token) => token.isSource;
  const referenceNotice = references?.length
    ? ["", `References variables: ${references.join(", ")}`]
    : [];
  const fileHeader = (defaultMessage) => [
    ...defaultMessage,
    ...referenceNotice,
  ];

  // Skapa en ny instans av StyleDictionary
  const sd = new StyleDictionary({
    include: references?.map((set) => `tokens/${set}.js`),
    source: [`tokens/${set}.js`],
    platforms: {
      css: getCssConfig({
        buildPathSubdirectory,
        destination: set,
        filter,
        fileHeader,
        outputReferences: true,
        selector,
      })
    },
  });

  sd.cleanAllPlatforms();
  sd.buildAllPlatforms();
});

/**
 * Build themes
 */
THEMES.forEach(({ set, output, selector, references }) => {
  const buildPathSubdirectory = "theme";
  
  // Skapa en ny instans av StyleDictionary
  const sd = new StyleDictionary({
    include: references?.map((set) => `tokens/${set}.js`),
    source: [`tokens/${set}.js`],
    platforms: {
      css: getCssConfig({
        buildPathSubdirectory,
        destination: output,
        outputReferences: true,
        selector,
      })
    },
  });

  sd.cleanAllPlatforms();
  sd.buildAllPlatforms();
});
