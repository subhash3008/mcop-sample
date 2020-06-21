import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import URLS from '../../urls';
import { ApiService } from '../services/api.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentDetails: any;
  studentForm: FormGroup = null;
  teacherList: string[] = [];
  formSubmitted = false;

  @ViewChild('housePrefect') housePrefectCheckbox: ElementRef;
  @ViewChild('schoolPrefect') schoolPrefectCheckbox: ElementRef;
  @ViewChild('successSwal') successSwal: SwalComponent;

  constructor(
    private _fb: FormBuilder,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    // this.getTeachersList(); 
    this.initializeStudentForm();
    this.studentDetails = {
      studentName: 'DAKSH',
      class: 'IV A',
      house: 'DHEERAJ',
      cards: {
        worthy: 1,
        intellect: 0,
        stature: 1,
        emotion: 0
      },
      houseIncharge: 'MONIKA CHHABRA',
      classTeacher: 'TARVEEN KAUR'
    };
    this.teacherList = [
      'AJAY RAI',
      'AANAND DUBEY',
      'KK DAS',
      'AMRITA SAHAY',
      'SUSHMA SINGH',
      'TANUJA H',
      'SATHISH B ASHWATH'
    ];
  }

  getTeachersList() {
    const url = this._api.baseUrl + URLS.getTeacherList;
    this._api.getRequest(url).subscribe(
      (res) => {
        console.log('RESPONSE : ', res);
        // this.initializeStudentForm(res && res.data);
      },
      (err) => {
        console.error('ERROR TEACHER : ', err);
        // this.initializeStudentForm();
      }
    );
  }

  initializeStudentForm() {
    this.studentForm = this._fb.group({
      resposibilitiesHeld: ['', Validators.required],
      academicPerformance: this._fb.group({
        total: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
        eleventhMidTermPerc: [null, Validators.required],
        attendancePerc: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
      }),
      failedMidtermOrNot: [null, Validators.required],
      scholasticAchievement: ['', Validators.required],
      sportsAchievement: ['', Validators.required],
      otherAchievement: ['', Validators.required],
      indisciplineActions: ['', Validators.required],
      issue1: this._fb.group({
        title: ['', Validators.required],
        content: ['', [Validators.required, this.maxWordsValidation.bind(this)]]
      }),
      issue2: this._fb.group({
        title: ['', Validators.required],
        content: ['', [Validators.required, this.maxWordsValidation.bind(this)]]
      }),
      issue3: this._fb.group({
        title: ['', Validators.required],
        content: ['', [Validators.required, this.maxWordsValidation.bind(this)]]
      }),
      otherReferee: [null],
      positionApplied: ['', Validators.required]
    });
    console.log('INITIALIZED : ', this.studentForm);
  }

  maxWordsValidation(control: AbstractControl) {
    if (control.value) {
      if (control.value.split(/ |.|,/).length > 250) {
        return { maxWords: true };
      }
    }
    return null;
  }

  postSelectionChange(e: any) {
    if (e.target.value === 'schoolPrefect') {
      this.housePrefectCheckbox.nativeElement.checked = false;
      this.studentForm.controls.positionApplied.setValue('schoolPrefect');
    } else if (e.target.value === 'housePrefect') {
      this.schoolPrefectCheckbox.nativeElement.checked = false;
      this.studentForm.controls.positionApplied.setValue('housePrefect');
    }
  }

  onSubmit() {
    console.log('STUDENT FORM VALUE : ', this.studentForm.value);
    this.successSwal.fire();
  }

  clearStudentForm() {
    this.formSubmitted = true;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
