import {
  createParser,
  createSearchParamsCache,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

const parseAsTags = createParser<string[]>({
  parse: (value) => (value ? value.split("+") : []),
  serialize: (value) =>
    (value && value.length > 0 ? value.join("+") : null) as string,
});

export const searchParamsCache = createSearchParamsCache({
  category: parseAsString.withDefault(""),
  tags: parseAsTags.withDefault([]),
  count: parseAsInteger.withDefault(0),
  page: parseAsIndex.withDefault(0),
});
