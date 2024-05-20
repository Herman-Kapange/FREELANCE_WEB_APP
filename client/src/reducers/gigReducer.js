// Defining the initial state for the gig form
export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem('currentUser'))?._id, // Extracting user ID from local storage if available
  title: '', // Gig title
  cat: '', // Gig category
  cover: '', // Gig cover image
  images: [], // Array to store additional gig images
  desc: '', // Gig description
  shortTitle: '', // Short gig title
  shortDesc: '', // Short gig description
  deliveryTime: 0, // Gig delivery time
  revisionNumber: 0, // Number of revisions allowed
  features: [], // Array to store gig features
  price: 0, // Gig price
};

// Reducer function for gig-related state management
export const gigReducer = (state, action) => {
  switch (action.type) {
    // Case for handling changes in input fields
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    // Case for adding images to the gig
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover, // Set cover image
        images: action.payload.images, // Set additional images
      };
    // Case for adding a feature to the gig
    case 'ADD_FEATURE':
      return {
        ...state,
        features: [...state.features, action.payload], // Add the new feature to the array
      };
    // Case for removing a feature from the gig
    case 'REMOVE_FEATURE':
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ), // Remove the specified feature from the array
      };
    // Default case, returns the current state if the action type is not recognized
    default:
      return state;
  }
};
