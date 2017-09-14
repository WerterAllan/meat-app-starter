import { AbstractControl } from '@angular/forms';

export class CommonValidations {

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailIsNotMatch: true };
    }

    return undefined;
  }

}
