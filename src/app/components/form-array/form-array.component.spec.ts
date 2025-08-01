import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArrayComponent } from './form-array.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormArrayComponent', () => {
  let component: FormArrayComponent;
  let fixture: ComponentFixture<FormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create the form with default empty values", () => {
    expect(component.emailForm).toBeDefined();
    const formValue = component.emailForm.value;

    expect(formValue).toEqual({ emails: [""] });
    expect(component.emails.length).toBe(1);
    expect(component.emails.at(0).value).toBe("");
  });

  it("should create form control after add button is pressed", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    const addButton = buttons[1];
    addButton.click();
    fixture.detectChanges();
    
    expect(component.emails.length).toBe(2);
    expect(component.emails.at(1).value).toBe("");
  });

  it("should remove form control after add button is pressed", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    const removeButton = buttons[0];
    removeButton.click();
    fixture.detectChanges();
    
    expect(component.emails.length).toBe(0);
  });

  it("should log email value on submit", () => {
    spyOn(console, 'log');
    component.emailForm.setValue({ emails: ['test@example.com'] });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith({ emails: ['test@example.com'] });
  });

  it('should mark email as invalid if empty', () => {
    const emailControl = component.emails.at(0);
    emailControl.markAsTouched();
    fixture.detectChanges();
    expect(emailControl.invalid).toBeTrue();
    expect(emailControl.errors?.['required']).toBeTrue();
  });

  it('should mark email as invalid if not a valid email', () => {
    const emailControl = component.emails.at(0);
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    fixture.detectChanges();
    expect(emailControl.invalid).toBeTrue();
    expect(emailControl.errors?.['email']).toBeTrue();
  });

  it('should mark email as valid if a valid email', () => {
    const emailControl = component.emails.at(0);
    emailControl.setValue('valid@email.com');
    emailControl.markAsTouched();
    fixture.detectChanges();
    expect(emailControl.valid).toBeTrue();
  });

  it('should disable submit button if form is invalid', () => {
    component.emailForm.setValue({ emails: ['invalid'] });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button if form is valid', () => {
    component.emailForm.setValue({ emails: ['test@email.com'] });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should add multiple emails and remove one', () => {
    component.addEmail();
    component.addEmail();
    expect(component.emails.length).toBe(3);
    component.removeEmail(1);
    expect(component.emails.length).toBe(2);
    expect(component.emails.at(1)?.value).toBe("");
  });

  it('should not throw if removeEmail is called with invalid index', () => {
    expect(() => component.removeEmail(10)).not.toThrow();
    expect(component.emails.length).toBe(1);
  });
});
