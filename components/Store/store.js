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
  setResources: action((state, resources) => {
    state.resources = resources;
  }),
  addEvent: action((state, event) => {
    if (state.events.find(e => e.id === event.id)) {
      return;
    }
    state.events.push(event);
  }),
  removeEvent: action((state, event) => {
    state.events = state.events.filter(e => e.id !== event.id);
  }),
  addResource: action((state, resource) => {
    if (state.resources.find(r => r.id === resource.id)) {
      return;
    }
    state.resources.push(resource);
  }
  ),
  removeResource: action((state, resource) => {
    state.resources = state.resources.filter(r => r.id !== resource.id);
  }
  ),
  setFeaturedEvents: action((state, events) => {
    state.featuredEvents = events;
  }
  ),
  setFeaturedResources: action((state, resources) => {
    state.featuredResources = resources;
  }
  ),
  setForYouEvents: action((state, events) => {
    state.forYouEvents = events;
  }
  ),
  setForYouResources: action((state, resources) => {
    state.forYouResources = resources;
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
    transformedFeaturedEvents.forEach(event => {
      actions.addEvent(event);
    }
    );
  }),
  fetchResources: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=20');
    const data = await response.json();
    const transformedResources = transformPosts(data);
    actions.setResources(transformedResources);
  }),
  fetchFeaturedResources: thunk(async (actions, payload) => {
    const response = await fetch('https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=26&per_page=5');
    const data = await response.json();
    const transformedFeaturedResources = transformPosts(data);
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
    // loop through interestedResourceCategories and interestedEventCategories and fetch resources and events

    //create comma separated string of category ids for resources
    const resourceCategories = interestedResourceCategories.join(',');
    console.log(resourceCategories);
    const resources = await fetch(`https://staging.ap-od.org/wp-json/wp/v2/posts?_embed&categories=${resourceCategories}`);
    const resourcesData = await resources.json();
    const newResources = await transformPosts(resourcesData);
    actions.setForYouResources(newResources);

    const events = await fetch(`https://staging.ap-od.org/wp-json/tribe/events/v1/events?_embed&geoloc=true&geoloc_lat=${location.latitude}&geoloc_long=${location.longitude}`);
    const eventsData = await events.json();
    console.log(eventsData);
    const newEvents = await transformEvents(eventsData.events);
    actions.setForYouEvents(newEvents);


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