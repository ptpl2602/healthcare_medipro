export const API_URL = 'http://11.11.7.84:3010/api';
export const API_VERSION = 'v1';
export const MAX_RETRIES = 3;
export const TIMEOUT = 5000;

export const HTTP_STATUS_CODE_SUCCESS = [
  200, // OK
  201, // CREATED
  202, // ACCEPTED
  203, // NON_AUTHORITATIVE_INFORMATION
  204, // NO_CONTENT
  205, // RESET_CONTENT
  206, // PARTIAL_CONTENT
  207, // MULTI-STATUS (WebDAV)
  208, // ALREADY_REPORTED (WebDAV)
  226 // IM USED (HTTP Delta encoding)
];

export const EMAIL_REGEX = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@([a-zA-Z0-9]|[.-][a-zA-Z0-9])+\.[a-zA-Z]{2,4}$/;

export const DATE_FORMAT = {
  eee: 'eee', // Mon
  MMMM: 'MMMM', // April
  p: 'p', // 12:00 AM
  PPPP: 'PPPP', // Monday, April 1st, 2024,
  hh_mm_aa: 'hh:mm aa', // 12:00 AM,
  HH_mm_aa: 'HH:mm:ss', // 00:00:00,
  yyyy_MM_dd: 'yyyy-MM-dd',
  yyyy_MM_dd_HH_mm_ss: 'yyyy-MM-dd HH:mm:ss', // 2024-04-01 00:00:00
  mm_dd_yyyy: 'MM/dd/yyyy', // 04/01/2024
  MMMM_do_yyyy: 'MMMM do, yyyy'
};

export const SELECT_APPOINTMENT = {
  numOfAvailableMonths: 4,
  startOfWorkTime: '08:00:00',
  endOfWorkTime: '17:00:00', // must greater than startOfWorkHour
  minutesOfSection: 30
};

// LOCALE
export const LOCALES = ['vi', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const PATH_NAMES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  SERVICES: '/services',
  BOOK_ONLINE: {
    ROOT: '/book-online',
    SELECT_APPOINTMENT: '/book-online/select-appointment',
    CLIENT_INFORMATION: '/book-online/client-information',
    CONFIRM_APPOINTMENT: '/book-online/confirm-appointment',
    CONFIRMED_APPOINTMENT: '/book-online/confirmed-appointment'
  }
});

export const NAV_LINKS = [
  { href: '/consultation-online', key: 'Consultation_Onl' },
  { href: '/medical-news', key: 'Medical_News' },
  { href: '/forum', key: 'Forum' }
];

export const NAV_BOOKING_LINKS = [
  { href: '/booking-doctor', title: 'Booking.booking_doctor', description: 'Booking.booking_doctor_description' },
  { href: '/booking-hospital', title: 'Booking.booking_hospital', description: 'Booking.booking_hospital_description' }
];

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_SPECIAL_CHARACTERS = '!@%^*()_~+-=[]{}<>';

export const AT_LEAST_ONE_LOWERCASE_REGEX = /[a-z]/;

export const AT_LEAST_ONE_UPPERCASE_REGEX = /[A-Z]/;

export const AT_LEAST_ONE_NUMBER_REGEX = /[0-9]/;

export const AT_LEAST_ONE_SPECIAL_CHAR_REGEX = /[!@%^*()_~+\-=[\]{}<>]/;
