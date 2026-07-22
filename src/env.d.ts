declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.css';

// Alias resolver for imports that start with '@/'
declare module '@/*' {
  const value: any;
  export default value;
}
