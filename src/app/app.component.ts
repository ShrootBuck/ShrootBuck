import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

type MenuItem = {
  name: string;
  link: string;
  icon?: string;
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
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // X
    iconRegistry.addSvgIcon(
      'x',
      sanitizer.bypassSecurityTrustResourceUrl('assets/x.svg')
    );

    // GitHub
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')
    );
  }
}
