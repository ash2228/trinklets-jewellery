// lib/navigation-loader.ts

class NavigationLoader {
  private listeners = new Set<(loading: boolean) => void>();

  show() {
    this.listeners.forEach(cb => cb(true));
  }

  hide() {
    this.listeners.forEach(cb => cb(false));
  }

  subscribe(cb: (loading: boolean) => void) {
    this.listeners.add(cb);

    return () => {
      this.listeners.delete(cb);
    };
  }
}

export const navigationLoader = new NavigationLoader();