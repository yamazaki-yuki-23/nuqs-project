import { createParser } from "nuqs/server";

export const parseAsTags = createParser<string[]>({
  parse: (value) => (value ? value.split("+") : []),
  serialize: (value) =>
    (value && value.length > 0 ? value.join("+") : null) as string,
});
