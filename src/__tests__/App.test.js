import { render, screen } from "@testing-library/react";
import App from "../App";

import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

// Code tests here
test("pizza checkbox is initially unchecked", () => {
    render(<App/>);
    const addPepperoni = screen.getByRole("checkbox", {
        name:/add pepperoni/i,
    });
    expect(addPepperoni).not.toBeChecked(); 
});
test("toppings appear in the toppings list when checked", ()=> {
    render(<App/>);

    const addPepperoni = screen.getByRole("checkbox",{name : /add pepperoni/i});
    userEvent.click(addPepperoni);

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByText("Cheese")).toBeInTheDocument(),
    expect(screen.queryByText("Pepperoni")).toBeInTheDocument();    
})
test("the checkbox becomes checked when clicked",()=> {
    render(<App/>);
    const addPepperoni = screen.getByRole("checkbox",{name : /add pepperoni/i});
        userEvent.click(addPepperoni);
        expect(addPepperoni).toBeChecked();
})

test("selected topping disappears when checked a second time", ()=> {
    render(<App/>);

    const addPepperoni = screen.getByRole("checkbox", {name: /add Pepperoni/i});
    userEvent.click(addPepperoni)

    expect(addPepperoni).toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();

    userEvent.click(addPepperoni);
    expect(addPepperoni).not.toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument(); 
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
})
