import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  OnInit,
  OnDestroy,
  inject,
  effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { Reel, User } from '@app/interfaces/story.interface';
import { StoriesDataService } from '@app/services/stories-data.service';

@Component({
  selector: 'story-card',
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.css',
  host: {
    '(document:keydown.ArrowRight)': 'nextStory()',
    '(document:keydown.ArrowLeft)': 'prevStory()',
  },
})
export class StoryCardComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  public user = input.required<User>();
  public stories = input.required<Reel[]>();
  public nextUserName = input.required<string>();
  public prevUserName = input.required<string>();

  public storyPosition = signal(0);
  public progress = signal(0);

  public storyContent = computed(() => {
    return this.stories().at(this.storyPosition());
  });

  private timer: any;

  private storiesService = inject(StoriesDataService);

  ngOnInit() {
    console.log('🔴🔴🔴🔴🔴🔴');
    this.startTimer();
  }

  ngOnDestroy() {
    console.log('Story card destroyed');
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
    this.storiesService.markStoryViewed(
      this.storyContent()!.id,
      this.user().name,
    );

    this.storyPosition.update((position) => {
      const newPosition = position + 1;
      return newPosition;
    });

    if (this.nextUserName() == null) {
      this.router.navigate(['/']);
    }

    if (this.storyPosition() === this.stories().length) {
      this.router.navigate(['/stories', this.nextUserName()]);
      this.storyPosition.set(0);
    }

    this.progress.set(0);
  };

  public prevStory = () => {
    this.storiesService.markStoryViewed(
      this.storyContent()!.id,
      this.user().name,
    );

    this.storyPosition.update((position) => Math.max(position - 1, 0));

    if (this.storyPosition() === 0) {
      this.router.navigate(['/stories', this.prevUserName()]);
      this.storyPosition.set(0);
    }

    this.progress.set(0);
  };
}
