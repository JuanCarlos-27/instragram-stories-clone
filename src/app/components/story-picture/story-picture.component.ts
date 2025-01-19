import { Component, input } from '@angular/core';

@Component({
  selector: 'story-picture',
  imports: [],
  templateUrl: './story-picture.component.html',
})
export class StoryPictureComponent {
  public picture = input.required<string>();
  public username = input.required<string>();
}
