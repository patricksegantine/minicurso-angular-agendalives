import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveDTO } from 'src/app/shared/models/live';
import { LiveService } from 'src/app/shared/services/live.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css'],
})
export class LiveListComponent implements OnInit {
  previousLives: LiveDTO[] = [];
  nextLives: LiveDTO[] = [];
  public loading: boolean = false;

  constructor(
    private liveService: LiveService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.obterLives();
  }

  obterLives() {
    this.loading = true;
    this.liveService.getLivesWithFlag('previous').subscribe(
      (data) => {
        this.previousLives = data.content;
        this.previousLives.forEach((live) => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            live.liveLink
          );
        });
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );

    this.liveService.getLivesWithFlag('next').subscribe((data) => {
      this.nextLives = data.content;
      this.nextLives.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
    });
  }
}
