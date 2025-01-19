import { NgStyle } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reel, User } from '@app/interfaces/story.interface';

@Component({
  selector: 'story-thumbnail-preview',
  imports: [NgStyle],
  templateUrl: './story-thumbnail-preview.component.html',
  styleUrl: './story-thumbnail-preview.component.css',
})
export class StoryThumbnailPreviewComponent implements OnInit {
  private router = inject(Router);
  public user = input.required<User>();
  public stories = input.required<Reel[]>();

  ngOnInit(): void {}

  public firstStory = computed(() => {
    return this.stories().at(0);
  });

  handleStoryClick = () => {
    this.router.navigate(['stories', this.user().name]);
  };
}
