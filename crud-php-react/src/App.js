import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const baseURL = "http://localhost:8080/php-crud/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    nombre: "",
    lanzamiento: "",
    desarrollador: "",
  });
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(frameworkSeleccionado);
  };

  const handleSubmit = async () => {
    const f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "POST");
    await axios
      .post(baseURL, f)
      .then((response) => {
        console.log(data)
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = async () => {
    const f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "PUT");
    await axios
      .post(baseURL, f, { params: { id: frameworkSeleccionado.id } })
      .then((response) => {
        const dataNueva = data;
        dataNueva.forEach((framework) => {
          if (framework.id === frameworkSeleccionado.id) {
            framework.nombre = frameworkSeleccionado.nombre;
            framework.lanzamiento = frameworkSeleccionado.lanzamiento;
            framework.desarrollador = frameworkSeleccionado.desarrollador;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const handleDelete = async () => {
    const f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseURL, f, { params: { id: frameworkSeleccionado.id } })
      .then((response) => {
        setData(
          data.filter((framework) => framework.id !== frameworkSeleccionado.id)
        );
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = async () => {
    await axios.get(baseURL).then((resp) => {
      setData(resp?.data);
    });
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="text-center">
      <br />
      <button
        className="btn btn-success"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.nombre}</td>
              <td>{d.lanzamiento}</td>
              <td>{d.desarrollador}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => seleccionarFramework(d, "Editar")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarFramework(d, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
            />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.nombre}
            />
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="lanzamiento"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}
            />
            <br />
            <label>Desarrollador: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="desarrollador"
              onChange={handleChange}
              value={
                frameworkSeleccionado && frameworkSeleccionado.desarrollador
              }
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => handleUpdate()}>
            Editar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Framework{" "}
          {frameworkSeleccionado && frameworkSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => handleDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
