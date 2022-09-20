// an example of how the fake backend appears, will be in JSON when retrieved from localStorage and sessionStorage
// will use ts to easier describe the types

// the User interface represents a user, whether it be traveller or tour guide
// ACCESS THE USEROBJ FOR A CERTAIN USER BY caling getItem('username') on the localStorage
// WARN: NEW FIELDS CAN BE ADDED ANY TIME AS NEEDED
interface User {
  username: string;
  password: string;
  role: 'TOUR_GUIDE' | 'TRAVELLER';  // will not have any other strings
}

// can retrieve the list of tour guides from localStorage, it will be a string array of their usernames
type TourGuides = string[];
