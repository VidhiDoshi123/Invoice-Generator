  
export const fetchData = async () => {
  try {
    const response = await fetch(" http://ec2-13-127-117-101.ap-south-1.compute.amazonaws.com:8080/api/invoice");
    const data = await response.json();
    console.log(data.data.company.name);
    return data;
  } catch (e) {
    console.log(e);
  }
};