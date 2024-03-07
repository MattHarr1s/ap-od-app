import { createStore, action, thunk } from 'easy-peasy';
import { transformEvents, transformPosts } from '../../utils/transformers';


const store = createStore({
  onboardingStep: 0,
  resources: [],
  events: [],
  featuredEvents: [],
  featuredResources: [],
  zipCode: "",
  favoriteEvents: [],
  interests: [],
  setOnboardingStep: action((state, step) => {
    state.onboardingStep = step;
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
    const response = await fetch('https://api.example.com/resources');
    const data = await response.json();
    actions.setResources(data);
  }),
  fetchFeaturedResources: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=5');
    const data = await response.json();
    const transformedFeaturedResources = await transformPosts(data);
    actions.setFeaturedResources(transformedFeaturedResources);
  }),
  setZipCode: action((state, zipCode) => {
    state.zipCode = zipCode;
  }),
  setResources: action((state, resources) => {
    state.resources = resources;
  }),
  addResource: action((state, resource) => {
    state.resources.push(resource);
  }),
});


export default store;