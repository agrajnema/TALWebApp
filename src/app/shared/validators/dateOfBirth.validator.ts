import {AbstractControl} from '@angular/forms';

export function dateOfBirthValidator(control: AbstractControl) {
    const controlValue = control.value;
    const currentDate = new Date();
    if (controlValue && new Date(controlValue) > currentDate) {
        return {
            dobGreaterThanCurrentDate : {
                dateOfBirthEntered: controlValue
            }
        };
    }
    return null;
}
