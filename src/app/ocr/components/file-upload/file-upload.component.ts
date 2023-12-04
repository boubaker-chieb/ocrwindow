import { Component, OnInit } from '@angular/core';
import { LANGUAGES } from '../../models/ocr.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OcrServiceService } from '../../services/ocr-service.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  public imgSrc: string | ArrayBuffer | null =
    '../../../../assets/imgs/img-thumbnail.jpeg';
  public text: string | null = 'Extracted text will appear here';
  public languages = LANGUAGES;
  public form!: FormGroup;
  private uploadedFile!: File;

  constructor(
    readonly formBuilder: FormBuilder,
    readonly ocrService: OcrServiceService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: [null, Validators.required],
      language: ['eng', Validators.required],
    });
  }

  handleFileChange(event: Event): void {
    let _event = event as { target?: { files?: any } };
    if (_event && _event.target && _event.target.files) {
      var reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imgSrc = e.target.result;
        }
      };
      reader.readAsDataURL(_event.target.files[0]);
      this.uploadedFile = _event.target.files[0];
    }
  }
  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.ocrService
        .ScanImage(this.uploadedFile, this.language!)
        .subscribe((res) => {
          this.text = res.text;
        });
    }
  }
  get file(): string | null {
    return this.form?.controls['file']?.value;
  }
  get language(): string | null {
    return this.form?.controls['language']?.value;
  }
}
