export const getAPIHost = () => (process.env.NODE_ENV !== "production") ? process.env.REACT_APP_DEV_API_HOST : ""