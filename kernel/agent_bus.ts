/**
 * Nayro AI OS Kernel Event Bus
 * Loose coupling pub-sub communication bus for Agents, Studios, and Workflows.
 */

export interface KernelEvent {
  id: string;
  type: string;
  sender: string;
  payload: any;
  timestamp: string;
}

export type EventCallback = (event: KernelEvent) => void;

export class KernelEventBus {
  private static instance: KernelEventBus;
  private listeners: Map<string, EventCallback[]> = new Map();

  private constructor() {}

  public static getInstance(): KernelEventBus {
    if (!KernelEventBus.instance) {
      KernelEventBus.instance = new KernelEventBus();
    }
    return KernelEventBus.instance;
  }

  public subscribe(eventType: string, callback: EventCallback): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(callback);
  }

  public publish(type: string, sender: string, payload: any): KernelEvent {
    const event: KernelEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      sender,
      payload,
      timestamp: new Date().toISOString()
    };

    const callbacks = this.listeners.get(type) || [];
    callbacks.forEach(cb => cb(event));

    return event;
  }
}
