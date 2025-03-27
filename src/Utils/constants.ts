import store from "../Store/store";

export const SiteName = "School Management App";
export const SiteSymb = " | ";
export const Tprimary = "#1976d2";
export const Tprimary1 = "#343a40";
export const TMMenuBG = "#007bff";
export const TSMenuBG = "#ffffffe6";
export const TERROR = "red";

export const apiUrl = 'http://localhost:8081/v1/';
export const siteUrl = '';

export type AppDispatch = typeof store.dispatch;

export const Relations = [
  { value: 1, label: "Father" },
  { value: 2, label: "Mother" },
  { value: 3, label: "Brother" },
  { value: 4, label: "Sister" },
  { value: 5, label: "Son" },
  { value: 6, label: "Daughter" },
  { value: 7, label: "Husband" },
  { value: 8, label: "Wife" },
  { value: 9, label: "Uncle" },
  { value: 10, label: "Aunt" },
  { value: 11, label: "Grandfather" },
  { value: 12, label: "Grandmother" },
  { value: 13, label: "Cousin" },
  { value: 14, label: "Nephew" },
  { value: 15, label: "Niece" },
  { value: 16, label: "Brother-in-law" },
  { value: 17, label: "Sister-in-law" },
  { value: 18, label: "Father-in-law" },
  { value: 19, label: "Mother-in-law" },
  { value: 20, label: "Son-in-law" },
  { value: 21, label: "Daughter-in-law" },
  { value: 22, label: "Friend" },
  { value: 23, label: "Guardian" },
  { value: 24, label: "Relative" }
];

export const Educations = [
  { value: 1, label: "No Formal Education" },
  { value: 2, label: "Primary School (1st to 5th Standard)" },
  { value: 3, label: "Middle School (6th to 8th Standard)" },
  { value: 4, label: "High School (9th to 10th Standard)" },
  { value: 5, label: "Higher Secondary (11th and 12th Standard)" },
  { value: 6, label: "Diploma" },
  { value: 7, label: "Undergraduate (UG)" },
  { value: 8, label: "Postgraduate (PG)" },
  { value: 9, label: "Ph.D." },
  { value: 10, label: "ITI (Industrial Training Institute)" },
  { value: 11, label: "Polytechnic" },
  { value: 12, label: "Teacher Training" },
  { value: 13, label: "Nursing" },
  { value: 14, label: "Engineering" },
  { value: 15, label: "Medical" },
  { value: 16, label: "Law" },
  { value: 17, label: "Agriculture" }
];

export const BloodGroups = [
  { 'value': 'A', 'label': 'A' },
  { 'value': 'A+', 'label': 'A+' },
  { 'value': 'A-', 'label': 'A-' },
  { 'value': 'B', 'label': 'B' },
  { 'value': 'B+', 'label': 'B+' },
  { 'value': 'B-', 'label': 'B-' },
  { 'value': 'AB+', 'label': 'AB+' },
  { 'value': 'AB-', 'label': 'AB-' },
  { 'value': 'O', 'label': 'O' },
  { 'value': 'O+', 'label': 'O+' },
  { 'value': 'O-', 'label': 'O-' },
];


