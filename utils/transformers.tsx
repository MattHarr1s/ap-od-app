import he from 'he';
import { Event, Post } from '../types/types'; // Adjust the import path as necessary


interface RawEvent {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cost: string;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
  };
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
  };
  image: {
    url: string;
  };
  venue: {
    address?: {
      zip: string;
    };
  };
}


interface RawPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia": [{
      source_url: string;
    }];
  };
  slug: string;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long', // full name of the month
    day: 'numeric', // numeric day
    year: 'numeric' // numeric year
  });
}

export const transformEvents = (events: RawEvent[]): Event[] => {
  return events
    .map((event) => {
      const decodedTitle = he.decode(event.title);
      const decodedExcerpt = he.decode(event.excerpt);

      return {
        id: event.id,
        title: decodedTitle,
        slug: event.slug,
        date: formatDate(event.date),
        excerpt: decodedExcerpt.replace(/<\/?[^>]+(>|$)/g, ""),
        cost: event.cost,
        start_date: formatDate(event.start_date),
        start_date_details: event.start_date_details,
        end_date: event.end_date,
        end_date_details: event.end_date_details,
        image: event.image,
        venue: event.venue.address ? { address: { zip: event.venue.address.zip } } : { address: { zip: "" } },
      };
    })
    .filter((event): event is Event => event !== null);
};



export const transformPosts = (posts: RawPost[]): Post[] => {
  return posts.map((post) => {
    const decodedTitle = he.decode(post.title.rendered);
    const decodedContent = he.decode(post.content.rendered);
    const decodedExcerpt = he.decode(post.excerpt.rendered);
   

    const sourceUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    return {
      id: post.id,
      title: decodedTitle,
      content: decodedContent,
      excerpt: decodedExcerpt.replace(/<\/?[^>]+(>|$)/g, ""),
      date: formatDate(post.date),
      link: post.link,
      slug: post.slug,
      featuredMedia: sourceUrl,
    };
  });
};