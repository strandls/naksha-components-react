export const ACTION_TYPES = {
  ADD: "add",
  CLEAR: "clear",
};

export function featuresReducer(
  state = [] as any[],
  { action, data, isMultiple }: { action: string; data?; isMultiple? }
) {
  switch (action) {
    case ACTION_TYPES.ADD:
      return isMultiple ? [...state, data] : [data];

    case ACTION_TYPES.CLEAR:
      return [];

    default:
      throw new Error("Invalid Action");
  }
}
