import { Injectable, signal } from '@angular/core';
import { Story } from '@interfaces/story.interface';
import { stories } from '../data';

@Injectable({
  providedIn: 'root',
})
export class StoriesDataService {
  constructor() {}

  public stories = signal<Story[]>(stories);

  public markStoryViewed = (storyId: string, userId: string): void => {
    const stories = this.stories();

    const story = stories.find((story) => story.user.name === userId);

    if (!story) return;

    const updatedStories = story.stories.map((s) =>
      s.id === storyId ? { ...s, watched: true } : s,
    );

    const newStories = stories.map((s) => {
      return s.user.name === userId ? { ...s, stories: updatedStories } : s;
    });

    this.stories.update(() => newStories);
  };
}
