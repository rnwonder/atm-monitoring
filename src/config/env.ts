const baseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.REACT_APP_LOCAL_API_PORT}`
  } else {
    return 'https://atm-monitor-api.gtbankgam.com'
  }
}

export default baseUrl
