import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { StoryPictureComponent } from '@components/story-picture/story-picture.component';
import { Router } from '@angular/router';
import { StoriesDataService } from '@services/stories-data.service';
import { Story } from '@interfaces/story.interface';

@Component({
  selector: 'app-home-page',
  imports: [NgStyle, NgTemplateOutlet, StoryPictureComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export default class HomePageComponent implements AfterViewInit {
  private router = inject(Router);
  private data = inject(StoriesDataService);

  public translateX = signal('translateX(0)');
  public movement = signal(1);
  public visbleProfiles = computed(() => this.data.stories());
  public profilesLength = computed(() => this.data.stories().length);

  public isFinal = computed(
    () => this.movement() * 4 >= this.profilesLength() - 4,
  );

  private container = viewChild<ElementRef<HTMLDivElement>>('main');
  private touchStartX = 0;
  private touchEndX = 0;

  ngAfterViewInit() {
    const container = this.container()?.nativeElement;

    if (container) {
      container.addEventListener(
        'touchstart',
        this.handleTouchStart.bind(this),
        false,
      );
      container.addEventListener(
        'touchend',
        this.handleTouchEnd.bind(this),
        false,
      );
    }
  }

  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleGesture();
  }

  handleGesture() {
    if (this.touchEndX < this.touchStartX) {
      this.nextProfiles();
    }
    if (this.touchEndX > this.touchStartX) {
      this.previousProfiles();
    }
  }

  nextProfiles() {
    this.translateX.set(`translateX(-${this.movement() * 328}px)`);
    this.movement.set(this.movement() + 1);
  }

  previousProfiles() {
    if (this.movement() === 1) return;

    this.translateX.set(`translateX(-${(this.movement() - 2) * 328}px`);
    this.movement.set(this.movement() - 1);
  }

  openStory(profile: Story) {
    this.router.navigate(['/stories', profile.user.name]);
  }
}
