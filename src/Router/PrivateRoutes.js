import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";

//stellen so Authentifizierungszustand über Kontext bereit, 
//sodass alle anderen Komponenten darauf zugreifen können

function PrivateRoutes() {

  const { jwt } = useContext(AuthContext)
  return (
    //<Outlet/> Platzhalter von React, der inhalt der aktuellen Route anzeigt
    //wenn json web token vorhanden, wird outlet gerendert, sprich Inhalt
    //der aktuellen Route wird angezeigt
    jwt ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes