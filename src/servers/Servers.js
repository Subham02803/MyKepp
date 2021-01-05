import axios from "axios";

export function SignUpAxios(
  firstName,
  lastName,
  emailId,
  userId,
  countryCode,
  phoneNo,
  password
) {
  var url = "http://localhost:8080/KeepBackend/SignUp?";
  //var url = "http://192.168.1.9:8080/KeepBackend/SignUp?";
  url +=
    "firstName=" +
    firstName +
    "&lastName=" +
    lastName +
    "&emailId=" +
    emailId +
    "&userId=" +
    userId +
    "&countryCode=" +
    countryCode +
    "&phoneNo=" +
    phoneNo +
    "&password=" +
    password;

  return axios.get(url, { Headers: { "Content-type": "Application/Json" } });
}

export function LogInAxios(userId, password) {
  //var url = "http://localhost:8080/KeepBackend/LogIn?";
  var url = "http://localhost:8080/MyDemoFoodApp/login?";
  url += "username=" + userId + "&password=" + password;

  return axios.get(url, { Headers: { "Content-type": "Application/Json" } });
}

export function GetKitchenCategories() {
  var url = "http://localhost:8080/MyDemoFoodApp/getAllFoodCategory";

  return axios.get(url, { Headers: { "Content-type": "Application/Json" } });
}

export function ChangeKitchenCategories(pkId, category, deleteStatus) {
  var url = "http://localhost:8080/MyDemoFoodApp/changeFoodCategory?";
  url +=
    "pkId=" + pkId + "&category=" + category + "&deleteStatus=" + deleteStatus;
  return axios.get(url, { Headers: { "Content-type": "Application/Json" } });
}

export function GetDataForKitchenTable(category, searchValue) {
  var url = "http://localhost:8080/MyDemoFoodApp/getFoodTable?";
  url += "category=" + category + "&searchValue=" + searchValue;
  return axios.get(url, { Headers: { "Content-type": "Application/Json" } });
}
