import { Component, computed, inject, signal } from '@angular/core';
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
export default class HomePageComponent {
  private router = inject(Router);
  private data = inject(StoriesDataService);

  public translateX = signal('translateX(0)');
  public movement = signal(1);
  public visbleProfiles = computed(() => this.data.stories());
  public profilesLength = computed(() => this.data.stories().length);

  public isFinal = computed(
    () => this.movement() * 4 >= this.profilesLength() - 4,
  );

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
