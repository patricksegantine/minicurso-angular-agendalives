import { LiveService } from 'src/app/shared/services/live.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  public liveForm: FormGroup = {} as FormGroup;

  constructor(
    public fb: FormBuilder,
    public service: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', Validators.required],
      channelName: ['', Validators.required],
      liveLink: ['', Validators.required],
      liveDate: ['', Validators.required],
      liveTime: ['', Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  createLive(): void {
    let newDate = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = `${newDate.format("YYYY-MM-DD")}T${this.liveForm.value.liveTime}`;
    this.service.postLives(this.liveForm.value).subscribe(result => {});
    this.cancel();

    window.location.reload();
  }
}
