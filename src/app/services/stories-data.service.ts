import { Injectable, signal } from '@angular/core';
import { Story } from '@interfaces/story.interface';
import { stories } from '../data';

@Injectable({
  providedIn: 'root',
})
export class StoriesDataService {
  constructor() {}

  public stories = signal<Story[]>(stories);
}
