# Ehm Bibliotek för design token

En enkel PoC för att hantera design tokens som har blivit exporterad via Figma Token Studio.

## Figma (Token Studio)

Design tokens är skapade i Figma via ett plugin som heter Token Studio och används som source of truth.
Tanken var att kunna bryta ut dessa tokens i olika nivåer ex (core, brand, components). Det visar sig att Token Studio tar betalt för att kunna hantera teman så i denna PoC så har jag strukturerat upp dom olika nivåerna i json för att programatiskt då plocka ut nycklar. I detta fallet core och brand.

I Token studio så kan vi koppla ihop en sync process via github/gitlab så att en designer har rätt att pusha till ett repositorie. 

## Github

På github tas dessa tokens emot och läggs i [token katalogen](https://github.com/niklasnilsson87/testTokens/blob/main/tokens/tokens.studio.json) om man pushar till `main`-branchen.

Vi måste köra ett script för att omvandla dessa tokens till css variabler och det gör vi med hjälp av [Style Dictionary](https://styledictionary.com/getting-started/installation/).

Resultatet ser ni under mappen css/variables

