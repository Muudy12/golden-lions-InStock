import "./App.scss";

function App() {
  return (
    <>
      <div className="warehouses">
        <div className="warehouses__title">
          <h1 className="warehouses__title-heading">Warehouses</h1>
          <div className="warehouses__title-options options">
            <form
              className="options__search-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search..."
                className="options__search-form-input"
              />
            </form>
            <button className="options__add-warehouse">
              + Add New Warehouse
            </button>
          </div>
        </div>

        <ul className="warehouses__list">
          <li className="warehouses__list-item headers">
            <h3>WAREHOUSE</h3>
            <h3>ADDRESS</h3>
            <h3>CONTACT NAME</h3>
            <h3>CONTACT INFORMATION</h3>
            <h3>ACTIONS</h3>
          </li>

          {getTestData().map((w, index) => {
            return <li key={index} className="warehouses__list-item warehouse">
              <h3>{w.name}</h3>
              <h3>{w.address}</h3>
              <h3>{w.contact.name}</h3>
              <h3><span>{w.contact.phone}</span><span>{w.contact.email}</span></h3>
              <div className="warehouse__actions">
                <img src="../src/assets/icons/delete_outline-24px.svg" alt="trash icon" className="warehouse__actions-delete" />
                <img src="../src/assets/icons/edit-white-24px.svg" alt="edit icon" className="warehouse__actions-edit"/>
              </div>
            </li>;
          })}
        </ul>
      </div>
    </>
  );
}

function getTestData() {
  const data = [
    {
      warehouse: "Washington",
      address: "33 Pearl Street SW, Washington, USA",
      contact: {
        name: "Graeme Lyon",
        position: "Warehouse Manager",
        phone: "+1 (647) 504-0911",
        email: "glyon@instock.com",
      },
      invetories: [
        {
          item: "Television",
          category: "Electronics",
          status: "In Stock",
          quantity: 0,
        },
      ],
    },
    {
      warehouse: "Washington",
      address: "33 Pearl Street SW, Washington, USA",
      contact: {
        name: "Graeme Lyon",
        position: "Warehouse Manager",
        phone: "+1 (647) 504-0911",
        email: "glyon@instock.com",
      },
      invetories: [
        {
          item: "Television",
          category: "Electronics",
          status: "In Stock",
          quantity: 0,
        },
      ],
    },
    {
      warehouse: "Washington",
      address: "33 Pearl Street SW, Washington, USA",
      contact: {
        name: "Graeme Lyon",
        position: "Warehouse Manager",
        phone: "+1 (647) 504-0911",
        email: "glyon@instock.com",
      },
      invetories: [
        {
          item: "Television",
          category: "Electronics",
          status: "In Stock",
          quantity: 0,
        },
      ],
    },
  ];

  return data;
}

export default App;
