import {
  createSearchParamsCache,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { parseAsTags } from "../src/utils/nuqs";

export const searchParamsCache = createSearchParamsCache({
  category: parseAsString.withDefault(""),
  tags: parseAsTags.withDefault([]),
  count: parseAsInteger.withDefault(0),
  page: parseAsIndex.withDefault(0),
});
