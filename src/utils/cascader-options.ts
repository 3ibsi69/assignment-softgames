import { OptionFilter } from "../../types/state-types";

export const optionsFilter: OptionFilter[] = [
  {
    value: "sort",
    label: "Sort",
    children: [
      {
        value: "Release Year",
        label: "Release Year",
        children: [
          {
            value: "asc",
            label: "Ascending",
          },
          {
            value: "desc",
            label: "Descending",
          },
        ],
      },
    ],
  },
  {
    value: "filter",
    label: "Filter",
    children: [
      {
        value: "Standalone",
        label: "Standalone",
        children: [
          {
            value: "true",
            label: "Standalone",
          },
          {
            value: "false",
            label: "Not Standalone",
          },
        ],
      },
      {
        value: "Type",
        label: "Type",
        children: [
          {
            value: "BaseGame",
            label: "Base Game",
          },
          {
            value: "Expansion",
            label: "Expansion",
          },
        ],
      },
    ],
  },
];
