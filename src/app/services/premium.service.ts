import {Injectable} from '@angular/core';
import {IUser} from '../model/user';

@Injectable()
export class PremiumService {
    calculatePremium(user: IUser): number {
        let genderFactor = 0;
        let premium = 0;
        const age = this.calculateAge(user.dateOfBirth);

        if (user.gender === 'Male') {
            genderFactor = 1.2;
        } else {
            genderFactor = 1.1;
        }
        premium = age * genderFactor * 100;
        return premium;
    }

    calculateAge(dob: Date): number {
        dob = new Date(dob);
        const ageDifference = Math.abs(Date.now() - dob.getTime());
        const age = Math.floor((ageDifference / (1000 * 3600 * 24)) / 365);
        return age;
    }
}
