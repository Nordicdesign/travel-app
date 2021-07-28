import {formHandler, formFeedback} from './formHandler'
import "regenerator-runtime/runtime.js" // to bring async to babel

test("formHandler exists", async () => {
  expect(formHandler).toBeDefined()
})

test("formFeedback exists", async () => {
  expect(formFeedback).toBeDefined()
})
