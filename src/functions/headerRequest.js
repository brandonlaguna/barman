const headerRequest = () => {
  // const userData = window.localStorage.getItem("userData");
  const businessData = JSON.parse(window.localStorage.getItem("businessData"));
  const token = window.localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    authorization: token,
    dbu: businessData?.dbuser,
    dbp: businessData?.dbpass,
    dbd: businessData?.dbname,
    Company: businessData?.id,
    IDEMPRESA: businessData?.id,
  };
};

export default headerRequest;
