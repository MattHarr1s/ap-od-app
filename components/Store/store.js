import { createStore, action, thunk } from 'easy-peasy';
import { transformEvents, transformPosts } from '../../utils/transformers';


const store = createStore({
  onboardingStep: 0,
  resources: [],
  events: [],
  featuredEvents: [],
  featuredResources: [],
  resourceCategories: [],
  eventCategories: [],
  resourceCategories: [],
  resourceTaxonomies: [],
  zipCode: "",
  favoriteEvents: [],
  interests: [],
  setOnboardingStep: action((state, payload) => {
    state.onboardingStep = payload;
  }),
  setInterests: action((state, interests) => {
    state.interests = interests;
  }),
  setEvents: action((state, events) => {
    state.events = events;
  }),
  setFeaturedEvents: action((state, events) => {
    state.featuredEvents = events;
  }
  ),
  setFeaturedResources: action((state, resources) => {
    state.featuredResources = resources;
  }
  ),
  setResourceCategories: action((state, categories) => {
    state.resourceCategories = categories;
  }
  ),
  setEventCategories: action((state, categories) => {
    state.eventCategories = categories;
  }
  ),
  setResourceTaxonomies: action((state, taxonomies) => {
    state.resourceTaxonomies = taxonomies;
  }
  ),
  setEventTaxonomies: action((state, taxonomies) => {
    state.eventTaxonomies = taxonomies;
  }
  ),
  // setFavoriteEvents: action((state, events) => {
  //   state.favoriteEvents = events;
  // }
  // ),
  //thunk action for retrieving events
  fetchEvents: thunk(async (actions, payload) => {
    const response = await fetch(`https://staging.ap-od.org/wp-json/tribe/events/v1/events?_embed&categories=147`);
    const data = await response.json();
    actions.setEvents(data.events.event);
  }),
  fetchFeaturedEvents: thunk(async (actions, payload) => {
    const response = await fetch(`https://staging.ap-od.org/wp-json/tribe/events/v1/events?_embed&categories=147`);
    const data = await response.json();
    transformedFeaturedEvents = await transformEvents(data.events);
    actions.setFeaturedEvents(transformedFeaturedEvents);
  }),
  fetchResources: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=20');
    const data = await response.json();
    actions.setResources(data);
  }),
  fetchFeaturedResources: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=5');
    const data = await response.json();
    const transformedFeaturedResources = await transformPosts(data);
    actions.setFeaturedResources(transformedFeaturedResources);
  }),

  fetchResourceCategories: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org//wp-json/wp/v2/categories?&_embed&type=post');
    
    const data = await response.json();
    console.log(data);
    actions.setResourceCategories(data);
  }
  ),
  fetchResourceTaxonomies: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/taxonomies?type=post');    
    const data = await response.json();
    actions.setResourceCategories(data);
  }
  ),

  setZipCode: action((state, zipCode) => {
    state.zipCode = zipCode;
  }),
  setOnboardingStep: action((state, step) => {
    state.onboardingStep = step;
  }),
  addInterests: action((state, interests) => {
    state.interests.push(interests);
  }),
  setResources: action((state, resources) => {
    state.resources = resources;
  }),
  addResource: action((state, resource) => {
    state.resources.push(resource);
  }),
});


export default store;