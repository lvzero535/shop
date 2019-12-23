import { FormGroup } from '@angular/forms';

export function validate(formGroup: FormGroup) {
  if (formGroup.valid) {
    return true;
  } else {
    const controls: any = formGroup.controls;
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
      }
    }
    return false;
  }
}
