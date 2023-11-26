import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [MatIconRegistry],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ShrootBuck';

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
