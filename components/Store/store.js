import { createStore, action, thunk, persist } from 'easy-peasy';
import { transformEvents, transformPosts, transformCategory } from '../../utils/transformers';
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
  addInterestedResourceCategory: action((state, categoryId) => {
    state.interestedResourceCategories.push(categoryId);
  }
  ),
  addInterestedEventCategory: action((state, categoryId) => {
    state.interestedEventCategories.push(categoryId);
  }
  ),
  removeInterestedResourceCategory: action((state, categoryId) => {
    state.interestedResourceCategories = state.interestedResourceCategories.filter(category => category !== categoryId);
  }
  ),
  removeInterestedEventCategory: action((state, categoryId) => {
    state.interestedEventCategories = state.interestedEventCategories.filter(category => category !== categoryId);
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
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/categories?_embed&parent=26&_fields=id,name,slug,&per_page=100');
    const data = await response.json();    
    const newData = data.map((category) => {    
      let newCategory = transformCategory(category);  
      return {
        id: newCategory.id,
        name: newCategory.name,
        slug: newCategory.slug        
      }
    });
    actions.setResourceCategories(newData);
  }
  ),
  fetchResourceTaxonomies: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/taxonomies?type=post&_fields=author,id,excerpt,title,link');
    const data = await response.json();    
    actions.setResourceCategories(data);
  }
  ),
  fetchEventCategories: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/tribe/events/v1/tags?&per_page=25');
    const data = await response.json();
    newData = data.tags.map((category) => {
      let newCategory = transformCategory(category);
      return {
        id: newCategory.id,
        name: newCategory.name,
        slug: newCategory.slug
      }
    }
    );
    


    actions.setEventCategories(newData);
  }
  ),
  fetchUserEventsAndResources: thunk(async (actions, payload, helpers) => {
    const { location, interestedResourceCategories, interestedEventCategories, } = helpers.getState();



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
    setItem: async function (key, value) {      
      await AsyncStorage.setItem(key, JSON.stringify(value))
    },
    removeItem: async function (key) {
      await AsyncStorage.removeItem(key);
    },

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