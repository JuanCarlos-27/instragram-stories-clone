import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'story-screen-modal',
  imports: [NgTemplateOutlet],
  templateUrl: './story-screen-modal.component.html',
  styleUrl: './story-screen-modal.component.css',
  host: {
    class: 'absolute inset-0 bg-black bg-[#1a1a1a] z-50 ',
  },
})
export default class StoryScreenModalComponent {
  private router = inject(Router);

  public closeModal() {
    this.router.navigate(['/']);
  }
}
