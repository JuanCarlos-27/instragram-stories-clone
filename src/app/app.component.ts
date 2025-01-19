import {
  Component,
  ComponentRef,
  computed,
  inject,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { StoryPictureComponent } from './components/story-picture/story-picture.component';
import { profiles } from './data';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [StoryPictureComponent, NgTemplateOutlet, NgStyle, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private router = inject(Router);

  profiles = signal(profiles);

  visbleProfiles = computed(() => {
    return this.profiles();
  });

  profilesLength = computed(() => this.profiles().length);

  translateX = signal('translateX(0)');
  movement = signal(1);

  isFinal = computed(() => this.movement() * 4 >= this.profilesLength() - 4);

  ref = inject(ViewContainerRef);

  nextProfiles() {
    this.translateX.set(`translateX(-${this.movement() * 328}px)`);
    this.movement.set(this.movement() + 1);
  }

  previousProfiles() {
    if (this.movement() === 1) return;

    this.translateX.set(`translateX(-${(this.movement() - 2) * 328}px`);
    this.movement.set(this.movement() - 1);
  }

  // public componentRef!: ComponentRef<StoryScreenModalComponent>;

  openStory(profile: any) {
    this.router.navigate(['/stories', profile.name]);
    // this.componentRef = this.ref.createComponent(StoryScreenModalComponent);
    // this.componentRef.instance.onClose.subscribe(() => {
    //   this.componentRef.destroy();
    // });
  }
}
