import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => api.get('repositories').then(({data}) => setRepos(data)), []);

  async function handleAddRepository() {
    const projectTitle = new Date().getTime();
    const newRepo = await api.post('repositories', {
      url: `https://github.com/fellypsantos/cool-project-${projectTitle}`,
      title: `Cool Project N° ${projectTitle}`,
      techs: ['ReactJS', 'NodeJS']
    });

    if (newRepo.data) setRepos([...repos, newRepo.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const updatedRepos = repos.filter(repo => repo.id !== id);
      setRepos([...updatedRepos]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo => (
            <li key={repo.id}>
              { repo.title }

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
          
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
