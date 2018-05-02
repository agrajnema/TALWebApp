import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, Form, FormGroup} from '@angular/forms';
import { IUser } from '../model/user';
import {genders} from '../model/constant';
import {ageValidator} from '../shared/validators/age.validator';
import {dateOfBirthValidator} from '../shared/validators/dateOfBirth.validator';
import { PremiumService } from '../services/premium.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  userForm: FormGroup;
  user: IUser;
  genders: string[];
  premium: number;
  constructor(private fb: FormBuilder, private premiumService: PremiumService) { }

  ngOnInit() {
    this.genders = genders;
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator, ageValidator ]],
      gender: ['', Validators.required]
    });
  }

  calculatePremium() {
    this.user = {
      name : this.userForm.get('name').value,
      dateOfBirth: this.userForm.get('dateOfBirth').value,
      gender: this.userForm.get('gender').value,
    };

    this.premium = this.premiumService.calculatePremium(this.user);
  }

  resetForm() {
    this.userForm.reset();
  }

}
