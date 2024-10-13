declare module "./bolt12.js" {
  export function createConfig(): any;
  export function submit_bolt12(
    config: any,
    bolt12: string,
    amount: number
  ): Promise<object>;
  export function request_bolt11(
    config: any,
    fetched_event: any,
    amount: number,
    onBolt11: (bolt11: string) => void,
    onPaid: () => void
  ): Promise<string>;
}
