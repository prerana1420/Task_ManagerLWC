import { LightningElement, api } from "lwc";
import addTodo from "@salesforce/apex/ToDoController.addTodo";



export default class Triallwc extends LightningElement {

    // standard public property to get component size
    // value can be SMALL, MEDIUM, LARGE based on current context

    @api flexipageRegionWidth;

    time = "10:00 PM";
    Greet = "Good Night";

    todos = [];
    connectedCallback() {
        this.createTime();
        setInterval(() => { this.createTime(); }, 1000 * 60);// this method refreshes the page in every 1 min[1000ms=1sec]

    }
    createTime() {
        var date = new Date();
        var hr = date.getHours();
        var rmin = date.getMinutes();

        this.time = `${this.createHour(hr)}:${this.doubleTime(rmin)} ${this.AMPM(hr)}`; //formatting the time
        this.createGreeting(hr);
    }
    createHour(hr) {
        return (hr === 0 ? 12 : hr > 12 ? hr - 12 : hr);
    }

    AMPM(hr) {
        return (hr >= 12 ? "PM" : "AM");
    }

    doubleTime(num) {
        return (num < 10 ? "0" + num : num);
    }

    createGreeting(hr) {
        return (hr < 12 ? this.Greet = "Good Morning !" : hr >= 12 && hr <= 16 ? this.Greet = "Good Afternoon !" : this.Greet = "Good Evening !");
    }

    todoHandler() {
        let inputBox = this.template.querySelector('lightning-input');//saving all the values fetched by query selector in the inputbox variable

        const todo = { todoName: inputBox.value, done: false };     //create a new todo object based on input box value

        addTodo({ payload: JSON.stringify(todo) })
            .catch(error => {
                console.error("Error in adding todo" + error);
            });

        inputBox.value = "";
    }

    //Get input box size based on current screen width
    get largePageSize() {
        return this.flexipageRegionWidth === "SMALL"
            ? "12"
            : this.flexipageRegionWidth === "MEDIUM"
                ? "8"
                : "6";
    }

}