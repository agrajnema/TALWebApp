import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumComponent } from './premium.component';
import { PremiumService } from '../services/premium.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {IUser} from '../model/user';

describe('PremiumComponent', () => {
  let component: PremiumComponent;
  let fixture: ComponentFixture<PremiumComponent>;
  let premiumService: PremiumService;
  let user: IUser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [PremiumService],
      declarations: [ PremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate age', () => {
    premiumService = TestBed.get(PremiumService);
    const age = premiumService.calculateAge(new Date('11/06/1986'));
    expect(age).toBeGreaterThan(18);
  });


  it('should calculate premium', () => {
    premiumService = TestBed.get(PremiumService);
    user = {
      name: 'Agraj',
      gender: 'Male',
      dateOfBirth: new Date('11/06/1986')
    };
    const premium = premiumService.calculatePremium(user);
    expect(premium).toBeGreaterThanOrEqual(3719);
  });

  it('form should be invalid when it is empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('name is required', () => {
    const name = component.userForm.controls['name'];
    expect(name.value).toBeFalsy();
  });

  it('dob should be invalid if it is after current date', () => {
    const dob = new Date();
    dob.setDate(dob.getDate() + 1);
    const dobControl = component.userForm.controls['dateOfBirth'];
    dobControl.setValue(dob);
    expect(dobControl.errors['dobGreaterThanCurrentDate']).toBeTruthy();
  });
});
