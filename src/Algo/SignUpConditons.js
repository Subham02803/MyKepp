export default function EmailCheck(emailId) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
    return true;
  }
  return false;
}
