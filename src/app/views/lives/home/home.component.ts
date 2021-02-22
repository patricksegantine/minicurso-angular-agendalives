import { LoaderService } from '../../../shared/services/loader.service';
import { LiveFormDialogComponent } from '../live-form-dialog/live-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private loaderService: LoaderService) {
      this.loaderService.isLoading.subscribe((v) => {
        this.loading = v;
      })
    }

  ngOnInit(): void {}

  addLive(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      minWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
