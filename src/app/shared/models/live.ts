import { SafeResourceUrl } from "@angular/platform-browser";

export interface LiveDTO {
  id: string;
  liveName: string;
  channelName: string;
  liveDate: string;
  liveTime: string;
  liveLink: string;
  registrationDate: string;
  urlSafe: SafeResourceUrl
}
