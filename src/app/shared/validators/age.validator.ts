import {AbstractControl} from '@angular/forms';

export function ageValidator(control: AbstractControl) {
    const dateOfBirth = control.value;
    if (dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const ageDifference = Math.abs(Date.now() - dob.getTime());
        const age = Math.floor((ageDifference / (1000 * 3600 * 24)) / 365);
        if (age < 18 || age > 65) {
            return {
                ageInvalid : {
                    age: age
                }
            };
        }
    }
    return null;
}
