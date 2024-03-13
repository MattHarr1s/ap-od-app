import { createStore, action, thunk, persist } from 'easy-peasy';
import { transformEvents, transformPosts } from '../../utils/transformers';
import AsyncStorage from "@react-native-async-storage/async-storage";



const store = createStore(persist({
  onboardingStep: 0,
  resources: [],
  events: [],
  featuredEvents: [],
  featuredResources: [],
  resourceCategories: [],
  eventCategories: [],
  resourceCategories: [],
  resourceTaxonomies: [],
  forYouEvents: [],
  forYouResources: [],
  locationServicesEnabled: false,
  location: {},
  zipCode: "",
  favoriteEvents: [],
  interestedResourceCategories: [],
  interestedEventCategories: [],
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
  setInterestedResourceCategories: action((state, categories) => {
    state.interestedResourceCategories = categories;
  }
  ),
  setInterestedEventCategories: action((state, categories) => {
    state.interestedEventCategories = categories;
  }
  ),
  setLocation: action((state, location) => {
    state.location = location;
  }),
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
    const newData = data.filter((category) => {
      if (category?.name?.includes('Facilitator')) {
        return null;
      }
      return {
        id: category.id,
        name: category.name,
        slug: category.slug
      }
    });
    actions.setResourceCategories(newData);
  }
  ),
  fetchResourceTaxonomies: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/taxonomies?type=post');
    const data = await response.json();
    actions.setResourceCategories(data);
  }
  ),
  fetchEventCategories: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/tribe/events/v1/tags?exclude=150&exclude=156&exclude=160');
    const data = await response.json();

    actions.setEventCategories(data.tags);
  }
  ),
  fetchUserEventsAndResources: thunk(async (actions, payload, helpers) => {
    const { location, interestedResourceCategories, interestedEventCategories, } = helpers.getState();
    console.log('loc',location);
    console.log(interestedEventCategories);
    console.log(interestedResourceCategories);


    // const resources = await fetch(`https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=${payload}`);
    // const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=20');
    // const data = await response.json();
    // actions.setResources(data);
  }),

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
  setLocationServicesEnabled: action((state, isEnabled) => {
    state.locationServicesEnabled = isEnabled;
  }),
}, {
  storage: {
    getItem: async function (key) {      
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    },
    setItem: function (key, value) {      
      AsyncStorage.setItem(key, JSON.stringify(value))
    }
  },
  allow: ['onboardingStep', 'interestedResourceCategories', 
  'interestedEventCategories', 'locationServicesEnabled', 
  'location', 'zipCode', 'events', 'featuredEvents', 
  'featuredResources', 'resourceCategories', 'eventCategories', 
  'resourceCategories', 'resourceTaxonomies', 
  'forYouEvents', 'forYouResources', 'resources', 
  'favoriteEvents']
}));


export default store;