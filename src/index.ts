import { create } from "zustand";

export type FetchStatus = "fetching" | "success" | "error";

export interface QueryValues<T extends Promise<any>> {
  status?: FetchStatus;
  error?: any;
  value: Awaited<T> | null;
}

export interface QueryActions<A extends any[]> {
  request: (...args: A) => Promise<void>;
  clear: () => void;
}

export type QueryState<T extends Promise<any>, A extends any[]> = QueryValues<T> & QueryActions<A>;

export const createQuery = <F extends (...args: any[]) => Promise<any>>(
  request: F,
  initialValue: Awaited<ReturnType<F>> | null = null,
) =>
  create<QueryState<ReturnType<F>, Parameters<F>>>((set) => ({
    value: initialValue,

    request: async (...args) => {
      try {
        set({ status: "fetching" });

        const value = await request(...args);

        set({ status: "success", value });
      } catch (e) {
        set({ status: "error", error: e });
      }
    },

    clear: () => set({ status: undefined, value: undefined, error: undefined, }),
  }));
