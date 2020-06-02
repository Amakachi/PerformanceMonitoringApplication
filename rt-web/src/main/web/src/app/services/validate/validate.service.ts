import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateFields(values) {
    for (const item of values) {
      if (item.value === null || item.value === '' || item.value === undefined) {
        const error = {
          error: item.name + ' login is required'
        };
        console.log(JSON.stringify(error));
        return error;
      }
    }
    return true;
  }

 passwordConfirm(c: AbstractControl): any {
    if (!c.parent || !c) { return; }
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword');

    if (!pwd || !cpwd) { return ; }
    if (pwd.value !== cpwd.value) {
        return { invalid: true, passwordMatch: 'Passwords do not match' };
    }
}
  }

