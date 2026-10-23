// HOW TO ADD A VIDEO
// Paste the full URL of your uploaded video file into `src` (e.g. 'https://cdn.../my-reel.mp4').
// `poster` is optional — a thumbnail image URL shown before the video plays.
// Leave `src` as '' to show an empty "coming soon" slot. Add or remove entries freely.

export type VideoItem = {
  title: string;
  src: string;
  poster?: string;
};

// 1080 × 1920 (vertical)
export const reels: VideoItem[] = [
{ title: 'Reel 1', src: '/Marketing (1).mp4' },
{ title: 'Reel 2', src: '/Marketing (2).mp4' },
{ title: 'Reel 3', src: '/Marketing (3).mp4' },
{ title: 'Reel 4', src: '/Marketing (4).mp4' }];


// 1080 × 1920 (vertical)
export const montages: VideoItem[] = [
{ title: 'Montage 1', src: '/Montage (2).mp4' },
{ title: 'Montage 2', src: '/Montage (1).mp4' },
{ title: 'Montage 3', src: '/Montage (3).mp4' },
{ title: 'Montage 4', src: '/Montage (4).mp4' }];


// 1920 × 1080 (horizontal)
export const longVideos: VideoItem[] = [
{ title: 'Long Video 1', src: '/Long Vid 1.mp4' },
{ title: 'Long Video 2', src: '/Long Vid 2.mp4' }];