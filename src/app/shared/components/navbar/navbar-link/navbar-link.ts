import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  imports: [RouterLink],
  templateUrl: './navbar-link.html',
  styleUrl: './navbar-link.scss'
})
export class NavbarLink {
  @Input() link = '';
  @Input() title = 'Accueil';
}
