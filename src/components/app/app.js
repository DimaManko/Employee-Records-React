import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import "./app.css";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../empoyers-list/empoyers-list";
import EmployersAddForm from "../emploeyrs-add-form/employers-add-form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: true, rise: true, id: 1 },
        { name: "Alex B.", salary: 3000, increase: true, rise: false, id: 2 },
        {
          name: "Forman A.",
          salary: 5000,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: uuidv4(),
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  increaseEmployersCount = () => {
    return this.state.data.reduce(
      (acc, item) => (item.increase ? acc + 1 : acc),
      0,
    );
  };

  render() {
    const increased = this.increaseEmployersCount();
    return (
      <div className="app">
        <AppInfo
          emploeyrsCount={this.state.data.length}
          increased={increased}
        />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployersList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
