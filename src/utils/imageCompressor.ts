/**
 * Image Compression Utility using HTML5 Canvas
 * Reduces high-resolution user photos & background cover images (5-10MB) 
 * down to crisp, lightweight JPEG Base64 strings (~20KB - 80KB)
 * preventing LocalStorage QuotaExceededError and ensuring permanent persistence across refreshes.
 */

export function compressImageFile(file: File, maxWidth = 800, maxHeight = 800, quality = 0.8): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      resolve('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
    };
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        resolve(e.target?.result as string || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
      };
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Fallback working MP4 demo reel video links
 */
export const DEFAULT_DEMO_REEL_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-stylish-outfit-43542-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-41394-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-girl-in-a-pink-shirt-showing-her-phone-41589-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-holding-a-glass-of-juice-41595-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-makeup-brush-and-mirror-43394-large.mp4'
];

export function getRandomDemoReelVideo(): string {
  return DEFAULT_DEMO_REEL_VIDEOS[Math.floor(Math.random() * DEFAULT_DEMO_REEL_VIDEOS.length)];
}
