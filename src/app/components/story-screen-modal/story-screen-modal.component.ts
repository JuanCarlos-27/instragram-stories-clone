import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StoryThumbnailPreviewComponent } from '@components/story-thumbnail-preview/story-thumbnail-preview.component';
import { StoryCardComponent } from '@components/story-card/story-card.component';
import { StoriesDataService } from '@services/stories-data.service';

@Component({
  selector: 'story-screen-modal',
  imports: [
    NgTemplateOutlet,
    StoryThumbnailPreviewComponent,
    StoryCardComponent,
  ],
  templateUrl: './story-screen-modal.component.html',
  styleUrl: './story-screen-modal.component.css',
  host: {
    class: 'absolute inset-0 bg-[#1a1a1a] z-50',
    '(document:keydown.escape)': 'closeModal()',
  },
})
export default class StoryScreenModalComponent {
  private router = inject(Router);

  private data = inject(StoriesDataService);

  public id = input.required<string>();

  public story = computed(() =>
    this.data.stories().find((story) => story.user.name === this.id()),
  );

  public hasPrevStory = computed(() => {
    return (
      this.data.stories().findIndex((story) => story.user.name === this.id()) >
      0
    );
  });

  public hasNextStory = computed(() => {
    return (
      this.data.stories().findIndex((story) => story.user.name === this.id()) <
      this.data.stories().length - 1
    );
  });

  public getAdjacentStory(offset: number) {
    const storyIndex = this.data
      .stories()
      .findIndex((story) => story.user.name === this.id());

    const position = storyIndex + offset;

    if (position < 0 || position >= this.data.stories().length) {
      return;
    }

    return this.data.stories().at(storyIndex + offset);
  }

  public closeModal() {
    this.router.navigate(['/']);
  }
}
