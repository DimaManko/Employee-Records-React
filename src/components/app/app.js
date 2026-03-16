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
      term: "",
      filter: "all",
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

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term: term });
  };

  OnfilterSelect = (filter) => {
    this.setState({ filter });
  };

  filterEmp = (items, filter) => {
    if (filter === "all") {
      return items;
    } else if (filter === "rise") {
      return items.filter((item) => item.rise);
    } else if (filter === "moreThan1000") {
      return items.filter((item) => item.salary > 1000);
    }
  };
  render() {
    const { data, term, filter } = this.state;
    const increased = this.increaseEmployersCount();
    const visibleData = this.searchEmp(data, term);
    const filterData = this.filterEmp(visibleData, filter);
    return (
      <div className="app">
        <AppInfo emploeyrsCount={data.length} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter onFilterPost={this.OnfilterSelect} filter={filter} />
        </div>
        <EmployersList
          data={filterData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
