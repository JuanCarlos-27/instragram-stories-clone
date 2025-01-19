export interface Story {
  user: User;
  stories: Reel[];
}

export interface User {
  name: string;
  image: string;
}

export interface Reel {
  id: string;
  image: string;
  watched: boolean;
  time: string;
}
