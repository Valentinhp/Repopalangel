import { useEffect, useState } from "react";
import axios from "axios";

const librosData = () => {
    const [libros, setLibros] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerLibro = async () => {
            try {
                const respuesta = await axios.get("http://127.0.0.1:5000/libros/");
                setLibros(respuesta.data);
            } catch (err) {
                console.error(err);
                setError("error al obtener los datos");
            } finally {
                setCargando(false);
            }
        };
        obtenerLibro();

    }, []);
    if (cargando) {
        return <p className = "Cargando">...</p>;
    }
    if (error) {
        return <p className = "Error">{error}</p>;
    }
    return(
        <div className="contenedor-libros">
        <h2 className="titulo">{libros.titulo}</h2>
        <ul className="datos">
            {Array.isArray(libros) && libros.map((libro, idx) => (
               <li key={idx} className= "items">Autor: <strong>{libro.autor}</strong> — Año: <strong>{libro.año}</strong> — Editorial: <strong>{libro.editorial}</strong></li>
            ))}
        </ul>
        </div>
    );
};

export default librosData;