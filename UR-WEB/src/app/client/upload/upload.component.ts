import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { first } from 'rxjs/operators';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

class IngridientsPoint {
    "ing_name": string;
    "ing_qty": number;
    "ing_unit": string;
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
  constructor(private formBuilder: FormBuilder,
              private uploadService:UploadService) {    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      recipeName: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipeWeight: ['', Validators.required],
      recipePersons: ['', Validators.required],
      recipefile:[''],
      ing_primary_ingredients:this.formBuilder.array([this.formBuilder.group({
                                                        ing_name: [''],
                                                        ing_qty: [''],
                                                        ing_unit:[''],
                                                        })
                                                    ]),
     ing_secondary_ingredients:this.formBuilder.array([this.formBuilder.group({
                                                      ing_name: [''],
                                                      ing_qty: [''],
                                                      ing_unit:[''],
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

  get ing_primary_ingredients() {
    return this.registerForm.get('ing_primary_ingredients') as FormArray;
  }

  add_primary_ingredients() {
    this.ing_primary_ingredients.push(this.formBuilder.group({
                                                              ing_name: [''],
                                                              ing_qty: [''],
                                                              ing_unit:[''],
                                                              }));
  }

  delete_primary_ingredients(index) {
    this.ing_primary_ingredients.removeAt(index);
  }


   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
     // stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }

     let other ={ "ing_primary_ingredients": [
      {
        "ing_name": "chillis",
        "ing_qty": 4,
        "ing_unit": "unit"
      },
      {
        "ing_name": "chillis",
        "ing_qty": 4,
        "ing_unit": "unit"
      }
    ],
    "ing_secondary_ingredients": [
      {
        "ing_name": "chillis",
        "ing_qty": 4,
        "ing_unit": "unit"
      },
      {
        "ing_name": "chillis",
        "ing_qty": 4,
        "ing_unit": "unit"
      }
    ]}

    let recipeObj = {
      "recipe_name": "a",
      "recipe_description": "b",
      "recipe_no_of_persons": "c",
      "recipe_kilo_grams": "10" 
    }
    

    const formData = new FormData();

    formData.append('recipe_img', this.selectedFile.file);

    Object.keys(recipeObj).forEach(key => {
      formData.append(key, recipeObj[key]);
    });

    Object.keys(other).forEach(key => {
      formData.append(key, JSON.stringify(other[key]));
    });

    console.log("formData", formData);
    console.log("Revision", this.registerForm.value);
    this.uploadService.add(formData)
    .pipe(first())
    .subscribe(
        data => {
            console.log("imageposted success", data);
           //this.message= (data as any).message;
           //close();
        },
        error => {
          console.log("image post data error==>", error);
        });

   }
 

}
