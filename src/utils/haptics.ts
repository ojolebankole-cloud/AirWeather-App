export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' = 'light') => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      switch (type) {
        case 'light':
        case 'selection':
          navigator.vibrate(8);
          break;
        case 'medium':
          navigator.vibrate(15);
          break;
        case 'heavy':
          navigator.vibrate(25);
          break;
        case 'success':
          navigator.vibrate([10, 30, 15]);
          break;
        case 'warning':
          navigator.vibrate([20, 50, 20]);
          break;
      }
    } catch {
      // Ignore haptics error if not supported in browser context
    }
  }
};
