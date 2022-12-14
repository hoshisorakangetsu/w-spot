// OMALORD THE TYPES ARE MESSY AF, but will make do since we cant have a real backend

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

// for premade tours
// link is where the premade tour leads to in our page
// name is the title of that premade tour
interface PremadeTours {
  link: string;
  name: string;
}

// for custom made tours applied by user
interface CustomTour {
  title: string;
  details: string; // the additional infos
  startDate: string; // shud be date string
  endDate: string; // shud be date string as well
  // customer field (customer is the username)
  customer: string;
  // fields below need to be filled in by customer when apply custom tour as when log in we only have the username
  customerName: string; // real name of the customer
  customerIC: string; // ic of the customer
  customerEmail: string; // email of the customer
  customerHpNo: string; // phone number of the customer

  // actually status is useless as we wont be toggling it
  status: 'ACCEPTED' | 'PENDING'; 
  guide: string; 
}

type CustomTours = CustomTour[];

// might not be needing this as for now only custom tour will be rendered dynamically
// for the tours applied by all customers
// status whether the tour applied is accepted or pending
// guide is username of the guide who accepted the tour
// customer is the customer who applied the tour
interface AppliedTours {
  premade: (PremadeTours & { status: 'ACCEPTED' | 'PENDING'; guide: string; customer: string; })[];
  customMade: (CustomTour & { status: 'ACCEPTED' | 'PENDING'; guide: string; customer: string; })[];
}
