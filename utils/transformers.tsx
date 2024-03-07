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

interface RawSinglePost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number; // Assuming this is the ID for the featured media
}

interface TransformedPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string; // URL of the featured image
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
  return events.map((event) => {
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
  console.log(posts);
  return posts.map((post) => {
    
    const decodedTitle = he.decode(post?.title?.rendered);
    const decodedContent = he.decode(post?.content?.rendered);
    const decodedExcerpt = he.decode(post?.excerpt?.rendered);
   

    const sourceUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || post._embedded?.["wp:featuredmedia"]?.[0]?.href || "";

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

function transformPost(data) {
  const { content, featuredMedia, ...rest } = data;

  // Function to remove images that match the featuredMedia URL
  const removeFeaturedImageFromContent = (htmlContent, imageUrl) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      if (img.src === imageUrl) {
        img.parentNode.removeChild(img);
      }
    });

    return doc.body.innerHTML;
  };

  // Use the function to clean the content
  const cleanedContent = removeFeaturedImageFromContent(content, featuredMedia);

  return {
    ...rest,
    content: cleanedContent,
    featuredMedia,
  };
}



async function getMediaUrlById(mediaId: number): Promise<string> {
  const baseUrl = 'https://staging.ap-od.org'; // Replace with your WordPress site URL
  const mediaEndpoint = `${baseUrl}/wp-json/wp/v2/media/${mediaId}`;

  try {
    const response = await fetch(mediaEndpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    const mediaData = await response.json();
    return mediaData.source_url; // The URL of the media item
  } catch (error) {
    console.error("Error fetching media URL:", error);
    return ''; // Return a default or empty string if the fetch fails
  }
}

// Transformer function
// export const  transformPost = async (rawPost: RawSinglePost): Promise<TransformedPost> => {
  
//   const featuredImageUrl = await getMediaUrlById(rawPost.featured_media);

//   return {
//     id: rawPost.id,
//     date: new Date(rawPost.date).toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     }),
//     slug: rawPost.slug,
//     link: rawPost.link,
//     title: he.decode(rawPost?.title?.rendered),
//     content: he.decode(rawPost?.content?.rendered),
//     excerpt: he.decode(rawPost?.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "")), // Remove HTML tags and decode entities
//     featuredImage: featuredImageUrl,
//   };
// }