import { render, screen } from "@testing-library/react"
import {time} from "./RunCalc"
import {Foo} from "./RunCalcTable"

// describe("Add", ()=>{
//     it("adds two numbers", ()=>{
//         expect(add(2,3)).toEqual(5)
//     })
//     it("adds two negative numbers", ()=>{
//         expect(add(-2,-3)).toEqual(-5)
//     })
//     it("throws if any argument is not a number", ()=>{
//         expect(()=> add(2,"3")).toThrow()
//     })
// })

// function add(a,b) {
//    if (typeof a === "string" || typeof b === "string") throw(new Error("Type Error"))
//     return a+b
// }

// describe("RunCalc", ()=>{
//     it("calculates time", ()=>{
//         expect(time(12, 12)).toEqual(60)
//     })
//     it.skip("throws on negative distance", ()=>{
//         expect(()=>time(12, -12)).toThrow()
//     })
// })

describe("Foo", ()=>{
it("renders Foo", ()=>{
    render(<Foo name="Bar"/>)
    expect(screen.getByText("Hello, Bar!")).toBeInTheDocument()
})

it("renders Foo with empty parameters", ()=>{
    render(<Foo />)
    expect(screen.getByText("Hello, MyFriend!")).toBeInTheDocument()
})

})

