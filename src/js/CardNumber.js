export function whatIsCard(ccnS) {
  if (Number(ccnS[0]) == 4) {
    return "visa";
  }
  if (Number(ccnS[0]) == 5) {
    return "mastercard";
  }
  if (Number(ccnS[0]) == 3) {
    return "americanexpress";
  }
  if (Number(ccnS[0]) == 2) {
    return "mir";
  }
  if (Number(ccnS[0]) == 6) {
    return "unionpay";
  }
}
