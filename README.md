## Exempel på användning utav Design Tokens
Syftet med detta är att skapa en länk mellan UX/UI-design och utveckling.

## Design Tokens-bibliotek
Detta är ett enkelt proof of concept (PoC) för att hantera design tokens som har exporterats via Figma-pluginet Token Studio.

### Figma och Token Studio
Design tokens skapas i Figma med pluginet Token Studio och fungerar som en "källa till sanning" (source of truth). Tanken är att dela upp tokens i olika nivåer, till exempel core, brand och components. Eftersom Token Studio kräver betalning för att hantera teman, har jag i denna PoC strukturerat de olika nivåerna i JSON-format för att programmatiskt extrahera nycklar, i detta fall core och brand.

Token Studio kan kopplas till Github eller Gitlab för att designers ska kunna synkronisera och skicka ändringar till ett repository.

### Github
På Github läggs dessa tokens i en token-katalog när man skickar till main-branchen.

Ett script används för att omvandla tokens till CSS-variabler med hjälp av verktyget Style Dictionary. Resultatet finns i mappen css/variables.