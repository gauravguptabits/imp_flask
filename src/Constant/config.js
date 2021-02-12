let BASE_URL_PATH;

if (process.env.NODE_ENV === 'development') {
  BASE_URL_PATH = 'https://abc.com/api'
} 
else if (process.env.REACT_APP_NODE_ENV === 'production') {
  BASE_URL_PATH = process.env.REACT_APP_BASE_URL
} 
else if (process.env.REACT_APP_NODE_ENV === 'staging') {
  BASE_URL_PATH = process.env.REACT_APP_BASE_URL
} 
else if (process.env.REACT_APP_NODE_ENV === 'qa') {
  BASE_URL_PATH = process.env.REACT_APP_BASE_URL
} 
else {
  BASE_URL_PATH = 'https://abc.com/api'
}

const config = {
  BASE_URL: BASE_URL_PATH,
};

export default config;
