import { Injectable, signal } from '@angular/core';
import { Story } from '../interfaces/story.interface';
import { profiles } from '../data';

@Injectable({
  providedIn: 'root',
})
export class StoriesDataService {
  constructor() {}

  public stories = signal<Story[]>(profiles);
}
