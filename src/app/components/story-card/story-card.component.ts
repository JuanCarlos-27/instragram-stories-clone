import { NgStyle, NgTemplateOutlet, NgFor } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Reel, User } from '@app/interfaces/story.interface';

@Component({
  selector: 'story-card',
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.css',
})
export class StoryCardComponent implements OnInit, OnDestroy {
  public user = input.required<User>();
  public stories = input.required<Reel[]>();

  public storyPosition = signal(0);
  public progress = signal(0);

  public storyContent = computed(() => {
    return this.stories().at(this.storyPosition());
  });

  private timer: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.progress.update((progress) => {
        if (progress >= 100) {
          this.nextStory();
          return 0;
        }
        return progress + 2;
      });
    }, 100);
  }

  public nextStory = () => {
    this.storyPosition.update((position) => {
      const newPosition = position + 1;
      if (newPosition >= this.stories().length) {
        clearInterval(this.timer);
        return position;
      }
      return newPosition;
    });
    this.progress.set(0);
  };

  public prevStory = () => {
    this.storyPosition.update((position) => Math.max(position - 1, 0));
    this.progress.set(0);
  };
}
