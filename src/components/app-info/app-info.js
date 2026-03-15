import "./app-info.css";

const AppInfo = (props) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании "БЭС"</h1>
      <h2>Общее число сотрудников: {props.emploeyrsCount}</h2>
      <h2>Премию получат: {props.increased}</h2>
    </div>
  );
};

export default AppInfo;
