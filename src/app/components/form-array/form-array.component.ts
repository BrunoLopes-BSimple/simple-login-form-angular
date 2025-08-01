import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-array',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css'
})
export class FormArrayComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
     emails: this.fb.array([this.createEmailControl()])
    });
  }
  createEmailControl() {
    return this.fb.control("", [Validators.required, Validators.email]);
  }

  get emails() {
    return this.emailForm.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(this.createEmailControl());
  }

  removeEmail(index: number) {
   this.emails.removeAt(index);
  }
  
  onSubmit() {
   console.log(this.emailForm.value);
  }
}
