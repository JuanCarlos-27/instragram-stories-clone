import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Reel } from '@app/interfaces/story.interface';

@Component({
  selector: 'story-picture',
  imports: [NgClass],
  templateUrl: './story-picture.component.html',
})
export class StoryPictureComponent {
  public picture = input.required<string>();
  public username = input.required<string>();
  public stories = input.required<Reel[]>();

  public hasViwedEveryStory = computed(() => {
    return this.stories().every((story) => story.watched);
  });
  // public viewed = input.required<boolean>();
}
