import { BUTTON, INDEX, INPUT, RULES_CLOSE, SAME, SIMILARITY_COLUMN, TEXT, URL } from "./constants";

abstract class Semantle {

    page: any
    guesses: [string, number][]
    possibilities: [string]
    ongoing: boolean

    constructor() {
        this.createPage()
        this.guesses = [];
        this.possibilities = [""]
        this.ongoing = true
    }

    async createPage() {
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();
        this.page = page
        await this.page.goto(URL);
        await page.waitForTimeout(100);
        await page.evaluate(()=>(document.querySelector(RULES_CLOSE) as HTMLElement).click())
        await this.page.waitForTimeout(500);
    }

    async inputGuess(guess: string) {
        let input = await this.page.waitForSelector(INPUT);
        let button = await this.page.waitForSelector(BUTTON);
        await input.type(guess);
        await this.page.waitForTimeout(100);
        await button.click();
        await this.page.waitForTimeout(100);
        const similarity = await this.scrapeResult(SIMILARITY_COLUMN)
        this.guesses.push([guess, similarity.toNumber()])
        if (similarity === SAME) {
            this.ongoing = false
        }
    }

    async scrapeResult(column: number) {
        let element = await this.page.waitForSelector(INDEX + "(" + column.toString() + ")");
        let test = await (await element.getProperty(TEXT))._remoteObject.value;
        return test
    }

    abstract generateGuess(): string;

    async play() {
        while (this.ongoing) {
            const guess = this.generateGuess()
            await this.inputGuess(guess)
        }
    }

}

class Dismantle extends Semantle {

    generateGuess() {
        return ""
    }

}

class BSPDismantle extends Semantle {

    generateGuess() {
        return ""
    }

}