import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {

    const value: string = control.value || '';

    if (!value) {
        return null;
    }

    const upperCaseCharacters = /[A-Z]+/g;
    if (upperCaseCharacters.test(value) === false) {
        return { passwordStrength: 'Password must contain at least one upper case character' };
    }

    const lowerCaseCharacters = /[a-z]+/g;
    if (lowerCaseCharacters.test(value) === false) {
        return { passwordStrength: 'Password must contain at least one lower case character' };
    }


    const numberCharacters = /[0-9]+/g;
    if (numberCharacters.test(value) === false) {
        return { passwordStrength: 'Password must contain at least one number' };
    }

    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacters.test(value) === false) {
        return { passwordStrength: 'Password must contain at least one special character' };
    }
    return null;
};
