/**
 * @jest-environment jsdom
 */
import formHandler from './formHandler';
import "regenerator-runtime/runtime.js"; // to bring async to babel

test("formHandler exists", async () => {
  expect(formHandler).toBeDefined();
});
