type Callback = (action: any) => void;

class DispatcherClass {
  private callbacks: Callback[] = [];

  register(callback: Callback): void {
    this.callbacks.push(callback);
  }

  dispatch(action: any): void {
    this.callbacks.forEach(callback => {
      callback(action);
    });
  }
}

export const Dispatcher = new DispatcherClass();