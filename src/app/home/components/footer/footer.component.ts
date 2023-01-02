import { Component } from '@angular/core';
import {
  faFacebookF,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  facebook = faFacebookF;
  instagram = faInstagram;
  youtube = faYoutube;
}
