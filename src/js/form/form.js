import "./form.css";
import { isValidLuhn } from "../Validate";
import { whatIsCard } from "../CardNumber";

export default class numberFromForm {
    constructor(parentEl) {
        if (typeof parentEl === "string") {
            parentEl = document.querySelector(parentEl);
          }
          this.parentEl = parentEl;
          this.onValidate = this.onValidate.bind(this);
          this.onInput = this.onInput.bind(this);
    }

    static get form() {
        return `
        <ul class="card-images">
                    <li class="card-image visa"></li>
                    <li class="card-image mastercard"></li>
                    <li class="card-image americanexpress"></li>
                    <li class="card-image mir"></li>
                    <li class="card-image unionpay"></li>
        </ul>
        <form class="card-number-form-widget">
            <div class="control">
                <input type="text" id="card-number-input" class="card-number-input">
                <button class="card-number-validate">Click to Validate</button>
            </div>
        </form>
        `;
    }

    static get validateSelector() {
        return '.card-number-validate';
    }

    static get inputSelector() {
        return '.card-number-input';
    }

    static get selector() {
        return '.card-number-form-widget';
    }

    bindToDOM() {
        this.parentEl.innerHTML = numberFromForm.form;

        this.element = this.parentEl.querySelector(numberFromForm.selector);
        this.submit = this.element.querySelector(numberFromForm.validateSelector);
        this.input = this.element.querySelector(numberFromForm.inputSelector);

        this.element.addEventListener('submit', this.onValidate);
        this.element.addEventListener('input', this.onInput);
    }

    onInput() {
        const cardType = whatIsCard(this.input.value);
        const cards = this.parentEl.querySelectorAll('.card-image');
        for (const i of cards) {
            if (i.classList.contains(cardType) || cardType === undefined) {
                i.classList.remove('uncolor')
            }
            else {
                i.classList.add('uncolor')
            }
        }
    }

    onValidate(event) {
        event.preventDefault();
        if (isValidLuhn(this.input.value)) {
            alert("The credit card number you entered passed the Luhn Check and is therefore a valid credit card number!")
        }
        else {
            alert("The credit card number you entered failed the Luhn Check. It's not valid, did you make a typo?")
        }
    }
}