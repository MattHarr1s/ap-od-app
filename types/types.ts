// types.ts

export interface StartDateDetails {
  year: string;
  month: string;
  day: string;
}

export interface VenueAddress {
  zip: string;
}

export interface Venue {
  address: VenueAddress;
}

export interface Image {
  url: string;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cost: string;
  start_date: string;
  start_date_details: StartDateDetails;
  end_date: string;
  end_date_details: StartDateDetails;
  image: Image;
  venue: Venue;
}

export interface PostTitle {
  rendered: string;
}

export interface PostContent {
  rendered: string;
}

export interface PostExcerpt {
  rendered: string;
}

export interface FeaturedMedia {
  source_url: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  link: string;
  slug: string;
  featuredMedia?: string; // Optional if you're setting a default image URL
  _embedded?: {
    "wp:featuredmedia": FeaturedMedia[];
  };
}

export interface RewardItem {
  id: number;
  title: string;
  image: string;
}


interface Taxonomy {
  name: string;
  slug: string;
  description: string;
  types: string[];
}

interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

interface ApiResponse<T> {
  [key: string]: T;
}