import Profile from "@components/profile"
import { useState,useEffect } from "react";




const FichaLuma = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch("/data/luma-data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar el perfil")
        return response.json()
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el perfil:", error);
        setLoading(false);
      });
  }, []);


  return (
    <>
      {loading ? <p>Cargando perfil...</p> : <Profile data={data} />}
    </>
  )
}

export default FichaLuma
