import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

type Project = {
  name: string;
  slogan: string;
  description: string;
  imageUrl?: string; // For now a string
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      name: 'Autoware',
      slogan: 'Self-driving cars',
      description:
        'Autoware is the world’s leading open-source project for autonomous driving.',
      imageUrl: 'https://avatars.githubusercontent.com/u/48420599',
    },
  ];
}
