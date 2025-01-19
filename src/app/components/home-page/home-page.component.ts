import { Component, computed, inject, signal } from '@angular/core';
import { profiles } from '../../data';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { StoryPictureComponent } from '../story-picture/story-picture.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [NgStyle, NgTemplateOutlet, StoryPictureComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export default class HomePageComponent {
  private router = inject(Router);

  public profiles = signal(profiles);
  public visbleProfiles = computed(() => this.profiles());
  public profilesLength = computed(() => this.profiles().length);
  public translateX = signal('translateX(0)');
  public movement = signal(1);

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

  openStory(profile: any) {
    this.router.navigate(['/stories', profile.name]);
  }
}
