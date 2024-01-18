import { isValidLuhn } from "../Validate";

test.each([
  ["4495858010925605", true],
  ["5222826680987897", true],
  ["345639671266574", true],
  ["449585801092", false],
  ["4495858010925603", false],
  ["4929698704197479611", true],
])("testing isvalidateLuhn function", (number, check) => {
  expect(isValidLuhn(number)).toEqual(check);
});
