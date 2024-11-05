import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css'],
})
export class DialogueComponent implements OnInit {
  optionList = ['First','second','Third','Fourth'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogueComponent>,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      // price: ['', Validators.required],
      remarks: ['', [Validators.required, Validators.minLength(10)]],
      field: ['', Validators.required],
      dob: ['', Validators.required],
      yearofstudy: ['', Validators.required],
    });
    console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['name'].setValue(this.editData.name)
      this.productForm.controls['remarks'].setValue(this.editData.remarks)
      // this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['field'].setValue(this.editData.field)
      this.productForm.controls['dob'].setValue(new Date(this.editData.dob)); // If it's a date string
      this.productForm.controls['yearofstudy'].setValue(this.editData.yearofstudy)

    }
  }
  
  addProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.editData) {
        this.updateProduct();
      } else {
        // Add new product
        this.api.postProduct(productData).subscribe({
          next: (res) => {
            alert('Student Details Added!');
            this.dialogRef.close('save'); // Pass success indication
          },
          error: () => {
            alert('Failed to Add Student Details');
          }
        });
      }
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Student Details Updated!');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Failed to Update Student Details');
      }
    });
  }
  

  

  private saveProduct() {
    // Logic to save the product can go here
    // For example, send the data to a service

    // Close the dialog
    this.dialogRef.close();

    // Call additional logic after saving
    // this.afterSave();
  }

  private afterSave() {
    // Any additional logic to run after saving
    console.log("Product saved successfully!");
    // You could notify the user or refresh a product list here
  }
  actionBtn:string="Save"
  
}
