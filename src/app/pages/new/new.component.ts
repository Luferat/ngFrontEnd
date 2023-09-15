import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thing } from 'src/app/models/thing.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  newThingForm!: FormGroup;
  thing!: Thing;
  success: boolean = false;

  validationMessages: any = {
    name: { required: 'Obrigatório.', minlength: 'Muito curto.' },
    description: { required: 'Obrigatória.', minlength: 'Muito curta.' },
    location: { required: 'Obrigatória.', minlength: 'Muito curta.' }
  }

  formErrors: any = {
    name: '',
    description: '',
    location: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.success = false;

    this.newThingForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });
  }

  createForm() {
    this.newThingForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  updateValidationMessages() {
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {

        this.formErrors[field] = '';

        const control = this.newThingForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  saveThing() {

    if (this.newThingForm.invalid) return;

    this.thing = this.newThingForm.value;
    this.thing.date = new Date();
    this.thing.status = 'on';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(environment.apiURL + '/things', this.thing, httpOptions)
      .subscribe(
        (data) => {
          this.success = true;
        },
        (error) => {
          alert('Oooops!\n' + error.message);
        }
      );

    this.newThingForm.reset();

  }

  reset() {
    this.success = false;
    return false;
  }

}
