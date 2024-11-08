/// <reference types="vite/types/importMeta.d.ts" />

type Character = {
  _id: number;
  name: string;
  imageUrl: string;
  updatedAt: string;
  films: string[],
  shortFilms: string[],
  tvShows: string[],
  sourceUrl: string,
}

type User = {
  id: number;
  updatedAt: EpochTimeStamp;
  firstName: string;
  lastName: string;
  birthDate: EpochTimeStamp;
  city: string;
  state: string;
  favCharacter: string;
  favMovie: string;
  favDisneyland: string;
}

