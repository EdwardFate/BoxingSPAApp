import { FormControl, ValidationErrors, FormGroup } from "@angular/forms";


export class TrainerValidator {

    constructor() { }


    public nameCustomValidator(control: FormControl): ValidationErrors {
        let resErrors: { [key: string]: any } = {};


        let value = control.value;

        let hasLatinChar = /[A-z]/.test(value);
        let hasCyrilicChar = /[А-я]/.test(value);
        let hasNumeretic = /[0-9]/.test(value);
        let isSpaceChar = /\s/.test(value);
        let isRequired = value == '';

        let totaValid: boolean = (hasLatinChar && !hasCyrilicChar || !hasLatinChar && hasCyrilicChar) && !hasNumeretic && !isSpaceChar && !isRequired;

        if (isRequired)
            resErrors["invalidNameRequired"] = "Имя не указано!";
        if (isSpaceChar)
            resErrors["invalidSpaceChar"] = "В имени не может быть пробелов!";
        if (hasNumeretic)
            resErrors["invalidNamebyNumber"] = 'В имени не должно быть цифр!';

        if (!totaValid) {
            resErrors["invalidName"] = 'Имя должно состоять из латинских или кириллических букв!';
            return resErrors;
        }
        else
            return null;

    }



    public surnameCustomValidator(control: FormControl): ValidationErrors {
        let resErrors: { [key: string]: any } = {};

        let value = control.value;

        let hasLatinChar = /[A-z]/.test(value);
        let hasCyrilicChar = /[А-я]/.test(value);
        let hasNumeretic = /[0-9]/.test(value);
        let isSpaceChar = /\s/.test(value);
        let isRequired = value == '';

        let totaValid: boolean = (hasLatinChar && !hasCyrilicChar || !hasLatinChar && hasCyrilicChar) && !hasNumeretic && !isSpaceChar && !isRequired;

        if (isRequired)
            resErrors["invalidSurnameRequired"] = "Фамилия не указана!";
        if (isSpaceChar)
            resErrors["invalidSpaceChar"] = "В фамилии не может быть пробелов!";
        if (hasNumeretic)
            resErrors["invalidSurnamebyNumber"] = 'В фамилии не должно быть цифр!';

        if (!totaValid) {
            resErrors["invalidName"] = 'Фамилия должна состоять из латинских или кириллических букв!';
            return resErrors;
        }
        else
            return null;

    }


    public passwordValidator(control: FormControl): ValidationErrors {

        let resErrors: { [key: string]: any } = {};



        const value = control.value;
        const hasNumber = /[0-9]/.test(value);
        const hasCapitalLetter = /[A-Z]/.test(value);
        const hasLowerLetter = /[a-z]/.test(value);
        const isLenghtValid = value ? value.length > 6 && value.length < 17 : false;
        const isSpaceChar = /\s/.test(value);
        const isRequired = value == '';
        const passwordValid = hasNumber && hasCapitalLetter && hasLowerLetter && isLenghtValid && !isSpaceChar && !isRequired;


        if (isSpaceChar)
            resErrors["invalidSpaceChar"] = "Пароль не может содержать пробелы!";
        if (isRequired)
            resErrors["invalidPasswordRequired"] = "Пароль не указан!";
        if (!hasNumber)
            resErrors["invalidPasswordNoNumber"] = 'Пароль должен содержать цифру!';
        if (!hasCapitalLetter)
            resErrors["invalidPasswordNoCapLet"] = 'Пароль должен содержать заглавную букву!';
        if (!hasLowerLetter)
            resErrors["invalidPasswordNoLowLet"] = 'Пароль должен содержать прописную букву!';
        if (!isLenghtValid)
            resErrors["invalidPasswordLength"] = 'Длина пароля должна быть от 6 до 17 символов!';

        if (!passwordValid)
            return resErrors;
        else
            return null;

    }


    public passwordConfirmValidator(group: FormGroup): ValidationErrors {

        let passwordInput = group.controls['passwordTrAng'];
        let passwordConfirmInput = group.controls['passwordConfirmTrAng'];

        if (passwordInput.value !== passwordConfirmInput.value) {
            passwordConfirmInput.setErrors({ notEquivalent: true });
        } else {
            passwordConfirmInput.setErrors(null);
            return null;
        }

    }

}