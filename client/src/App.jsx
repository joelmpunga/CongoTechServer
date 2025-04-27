import { useEffect, useState } from 'react'
import SideBarAdmin from './components/SideBarAdmin'
import SideBarSecretaire from './components/SideBarSecretaire'
import Header from './components/Header'
import { useNavigate } from 'react-router-dom'
import FoldersWorkspace from './components/FoldersWorkspace'

function App({ children, getUserData }) {
  const nom = localStorage.getItem('nom');
  const postnom = localStorage.getItem('postnom');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("Kadea");

  if (!isAuthenticated) {
    navigate("/login");
  }

  // Utilisation de useEffect pour observer les changements de searchField
  useEffect(() => {
    // Code à exécuter chaque fois que searchField change
    // Vous pouvez mettre ici toute logique nécessaire pour le rendu du composant App
    // Par exemple, vous pouvez mettre à jour d'autres états ou effectuer des appels à des API
  }, [searchField]); // On utilise searchField comme dépendance
  return (
    <>
      {
        children
      }
    </>
  )
}

export default App
