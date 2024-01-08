import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

type MenuItem = {
  name: string;
  link: string;
  icon?: string;
};

type SocialIcon = {
  name: string;
  link: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [MatIconRegistry],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ShrootBuck';

  menu: MenuItem[] = [
    { name: 'Home', link: '', icon: 'home' },
    { name: 'Blog', link: 'https://blog.shrootbuck.com', icon: 'article' },
    { name: 'Projects', link: 'projects', icon: 'folder' },
    { name: 'Contact', link: 'contact', icon: 'email' },
  ];

  socialMenu: SocialIcon[] = [
    { name: 'x', link: 'https://twitter.com/shrootbuck' },
    { name: 'github', link: 'https://github.com/shrootbuck' },
  ];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {
    // X
    this.socialMenu.forEach((socialIcon) => {
      iconRegistry.addSvgIcon(
        socialIcon.name,
        sanitizer.bypassSecurityTrustResourceUrl(
          `assets/${socialIcon.name}.svg`
        )
      );
    });

    // WIP Notification
    this._snackBar.open('This website is a work in progress!', undefined, {
      duration: 3000,
    });
  }
}
