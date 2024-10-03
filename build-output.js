import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

register(StyleDictionary, { platform: 'css' });

const VARIABLES = [
  { set: "core", destination: "core", outputReferences: false },
  { set: "brand", destination: "brand", references: ["core"], outputReferences: true },
];

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
    "ts/typography/fontWeight",
    "ts/color/modifiers",
    "ts/size/css/letterspacing",
    "ts/color/css/hexrgba",
    "border/css/shorthand",
    "typography/css/shorthand",
    "shadow/css/shorthand",
    "name/kebab",
  ],
  prefix: "ehm",
  buildPath: buildPathSubdirectory,
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

VARIABLES.forEach(({ set, destination, references, outputReferences }) => {
  const buildPathSubdirectory = "css/variables/";

  const filter = (token) =>
    set === 'brand'
      ? token.filePath.includes('brand') 
      : token.filePath.includes(set);

  const referenceNotice = references?.length
    ? ["", `References variables: ${references.join(", ")}`]
    : [];

  const fileHeader = (defaultMessage) => [
    ...defaultMessage,
    ...referenceNotice,
  ];

  const allRefs = references?.map((refSet) => `tokens/${refSet}.js`)

  const SD = new StyleDictionary({
    include: allRefs,
    source: [`tokens/${set}.js`],
    platforms: {
      css: getCssConfig({
        buildPathSubdirectory,
        destination: destination,
        filter,
        fileHeader,
        outputReferences,
      }),
    },
  });

  SD.cleanAllPlatforms();
  SD.buildAllPlatforms();
});
