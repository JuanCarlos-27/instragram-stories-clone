import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'story-card',
  imports: [NgTemplateOutlet],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.css',
})
export class StoryCardComponent {}
