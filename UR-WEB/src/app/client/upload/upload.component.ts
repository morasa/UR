import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { first } from 'rxjs/operators';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  registerForm: FormGroup;
  fileData: File = null;
  selectedFile: ImageSnippet;
  displayMessage:string = "";
  constructor(private formBuilder: FormBuilder,
    private uploadService: UploadService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
                    recipeName: ['', Validators.required],
                    recipeDescription: ['', Validators.required],
                    recipeWeight: ['', Validators.required],
                    recipePersons: ['', Validators.required],
                    ing_primary_ingredients: this.formBuilder.array([
                                              this.formBuilder.group({
                                                                ing_name: [''],
                                                                ing_qty: [''],
                                                                ing_unit: [''],
                                                              })
                                              ]),
                    ing_secondary_ingredients: this.formBuilder.array([
                                              this.formBuilder.group({
                                                                ing_name: [''],
                                                                ing_qty: [''],
                                                                ing_unit: [''],
                                                              })
                                              ])
                  });
  }

  fileProgress(fileInput: any) {
    const file: File = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  get f() { 
    return this.registerForm.controls; 
  }

  get ing_primary_ingredients() {
    return this.registerForm.get('ing_primary_ingredients') as FormArray;
  }

  get ing_secondary_ingredients() {
    return this.registerForm.get('ing_secondary_ingredients') as FormArray;
  }

  add_primary_ingredients() {
    this.ing_primary_ingredients.push(
                      this.formBuilder.group({
                                      ing_name: [''],
                                      ing_qty: [''],
                                      ing_unit: ['']
                                    })
                      );
  }

  delete_primary_ingredients(index) {
    this.ing_primary_ingredients.removeAt(index);
  }

  add_sceondary_ingredients() {
    this.ing_secondary_ingredients.push(
                          this.formBuilder.group({
                                    ing_name: [''],
                                    ing_qty: [''],
                                    ing_unit: ['']
                                  })
                          );
  }

  delete_secondary_ingredients(index) {
    this.ing_secondary_ingredients.removeAt(index);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log("FV", this.registerForm.value);

    this.uploadService.add(this.registerForm.value,this.selectedFile.file)
      .pipe(first())
      .subscribe(
        data => {
          this.displayMessage = (data as any).message;
          console.log("SUCCESSFULL RECIPE UPLOAD", data);
        },
        error => {
          console.log("SADDIE::UNABLE TO UPLOAD RECIPE", error);
        });
  }

}
