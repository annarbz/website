import {Genre} from "@/lib/api/types";

export interface FilterData {
  genres: Genre[],
  languages: string[],
  year: string
}